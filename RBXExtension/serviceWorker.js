import { getUserFromUserId, getAvatarIconUrlFromUserId, getDataUrlFromWebResource, RobloxWWWRegex, RobloxLoginRegex, RobloxPresenceRegex, removeValueFromArray } from './utils/utility.js';
const RobloxLoginRegexMatch = new RegExp(RobloxLoginRegex);
const ALERT_TIMER_FOR_DETACHED_DEBUGGER = 2000;
const RETRY_TIMER_FOR_FAILED_REQUESTS = 5000;
const RESET_TIMER_FOR_RECENT_USER_PRESENCE = 15000;
const MAXIMUM_USER_PRESENCES_HANDLED_IN_SINGLE_REQUEST = 3;
let isTryingToAttach = false;
let isDebuggerAlreadyAttached = false;
let tabTitle = '';
let attachedTabId = '';
async function attachDebugger(details) {
    if (isTryingToAttach || isDebuggerAlreadyAttached)
        return;
    isTryingToAttach = true;
    let tabId = 0;
    let tab = {};
    if (!Array.isArray(details)) {
        const tabInfo = await chrome.tabs.get(details.tabId);
        if (!tabInfo.url.match(RobloxWWWRegex) || RobloxLoginRegexMatch.test(tabInfo.url)) {
            isTryingToAttach = false;
            return;
        }
        ({ tabId } = details);
        tab = tabInfo;
    }
    else {
        for (const tab of details) {
            if (tab.status !== 'unloaded' && !RobloxLoginRegexMatch.test(tab.url)) {
                tabId = tab.id;
                break;
            }
        }
    }
    if (!tabId > 0) {
        isTryingToAttach = false;
        return;
    }
    try {
        await chrome.debugger.attach({ tabId: tabId }, '1.3');
        await chrome.debugger.sendCommand({ tabId: tabId }, 'Network.enable');
    }
    catch (error) {
        isTryingToAttach = false;
        if (error.message === 'Cannot access a chrome:// URL')
            return;
        console.error(error);
    }
    chrome.webRequest.onBeforeRequest.removeListener(attachDebugger);
    isTryingToAttach = false;
    isDebuggerAlreadyAttached = true;
    attachedTabId = tabId;
    chrome.storage.session.set({ debuggerState: 'attached' });
    if (JSON.stringify(tab) === '{}') {
        tab = await chrome.tabs.get(tabId);
    }
    tabTitle = tab.title;
    console.log(`Currently attached to: ${tabTitle}`);
}
function attemptToAttachDebugger() {
    chrome.tabs.query({ url: "https://www.roblox.com/*" }, attachDebugger);
    chrome.webRequest.onBeforeRequest.addListener(attachDebugger, { urls: ["https://www.roblox.com/*"] });
}
function onDetach() {
    isDebuggerAlreadyAttached = false;
    attachedTabId = '';
    console.log('The debugger has been detached.');
    attemptToAttachDebugger();
    alertIfDebuggerIsDetached('warn');
}
function onDetachWithoutReattach() {
    isDebuggerAlreadyAttached = false;
    attachedTabId = '';
    console.log('The debugger has been disabled.');
    alertIfDebuggerIsDetached('suppress');
}
function alertIfDebuggerIsDetached(action = 'warn') {
    chrome.storage.session.set({ debuggerState: 'detached' });
    if (action !== 'warn')
        return;
    setTimeout(() => {
        if (isDebuggerAlreadyAttached)
            return;
        chrome.notifications.create({
            iconUrl: './utils/RBLX_Tilt_Primary_Black.png',
            title: 'Friend Activity Tracker is disabled!',
            message: 'You will no longer receive notifications on friend activity.',
            contextMessage: 'To reenable, make sure to keep the website open and stay logged in!',
            priority: 2,
            type: 'basic',
            silent: false
        });
    }, ALERT_TIMER_FOR_DETACHED_DEBUGGER);
}
(async function init() {
    chrome.storage.session.set({ debuggerState: 'detached' });
    const items = await chrome.storage.sync.get({ enableFriendActivityTracker: true });
    if (items.enableFriendActivityTracker) {
        attemptToAttachDebugger();
        chrome.debugger.onDetach.addListener(onDetach);
    }
})();
chrome.storage.sync.onChanged.addListener(changes => {
    if (!changes.enableFriendActivityTracker)
        return;
    if (changes.enableFriendActivityTracker.newValue === false) {
        if (!attachedTabId)
            return;
        chrome.debugger.detach({ tabId: attachedTabId }, onDetachWithoutReattach);
    }
    else {
        attemptToAttachDebugger();
    }
});
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tabId !== attachedTabId)
        return;
    tabTitle = tab.title;
    if (!changeInfo.url)
        return;
    if (!changeInfo.url.match(RobloxWWWRegex) || RobloxLoginRegexMatch.test(changeInfo.url)) {
        chrome.debugger.detach({ tabId: attachedTabId }, onDetach);
    }
});
chrome.debugger.onEvent.addListener(async (source, method, params) => {
    const { requestId } = params;
    if (method === 'Network.responseReceived' &&
        params.response.url.match(RobloxPresenceRegex) &&
        params.response.status === 200) {
        if (params.type === 'Preflight')
            return;
        if (params.response.headers["content-length"] === 0)
            return;
        async function getResponseBodyAndPassOnData() {
            const result = await chrome.debugger.sendCommand(source, 'Network.getResponseBody', { requestId: requestId });
            const responseBody = result.body;
            isFriendActivity(responseBody);
        }
        try {
            await getResponseBodyAndPassOnData();
        }
        catch (error) {
            console.warn('Failed to retrieve response body, will retry in a few seconds.', requestId, params, error);
            setTimeout(() => {
                getResponseBodyAndPassOnData()
                    .catch(error => console.error('Failed to retrieve response body.', requestId, params, error));
            }, RETRY_TIMER_FOR_FAILED_REQUESTS);
        }
    }
});
function isFriendActivity(responseBody) {
    try {
        const object = JSON.parse(`${responseBody}`);
        if (object.userPresences && object.userPresences.length <= MAXIMUM_USER_PRESENCES_HANDLED_IN_SINGLE_REQUEST) {
            sendActivityAlert(object.userPresences);
        }
    }
    catch (error) {
        if (!error instanceof SyntaxError) {
            console.warn(error);
        }
    }
}
const recentUserPresences = [];
async function sendActivityAlert(userPresences) {
    for (const userPresence of userPresences) {
        if (recentUserPresences.includes(JSON.stringify(userPresence)))
            continue;
        recentUserPresences.push(JSON.stringify(userPresence));
        setTimeout(() => {
            removeValueFromArray(recentUserPresences, JSON.stringify(userPresence));
        }, RESET_TIMER_FOR_RECENT_USER_PRESENCE);
        const { placeId, rootPlaceId, userId, userPresenceType } = userPresence;
        if (!rootPlaceId)
            return;
        if (userPresenceType !== 2)
            return;
        let isSubPlace = false;
        let rootPlaceName = '';
        let subPlaceName = '';
        let placeUrl = '';
        let userDisplayName = '';
        let imageDataUrl = '';
        let notificationId = '';
        isSubPlace = placeId !== rootPlaceId;
        await (async function fetchData() {
            const placeIdsToFetch = isSubPlace ? `${rootPlaceId}&placeIds=${placeId}` : rootPlaceId;
            const games = await fetch(`https://games.roblox.com/v1/games/multiget-place-details?placeIds=${placeIdsToFetch}`).then(response => response.json());
            rootPlaceName = games[0].name;
            placeUrl = games[0].url;
            if (isSubPlace) {
                subPlaceName = games[1].name;
                placeUrl = games[1].url;
            }
            const userObjectPromise = getUserFromUserId(userId);
            const imageUrlPromise = getAvatarIconUrlFromUserId(userId, 'avatar-headshot', 100);
            const responses = await Promise.all([userObjectPromise, imageUrlPromise]);
            const userObject = responses[0];
            const imageUrl = responses[1];
            imageDataUrl = await getDataUrlFromWebResource(imageUrl);
            userDisplayName = userObject.displayName;
        })();
        notificationId = await chrome.notifications.create({
            iconUrl: imageDataUrl,
            title: !isSubPlace ? `${userDisplayName} is playing!` : `${userDisplayName} is in a subplace!`,
            message: !isSubPlace ? `Now in: ${rootPlaceName}` : `Now in: ${subPlaceName}`,
            contextMessage: !isSubPlace ? '' : `Part of: ${rootPlaceName}`,
            priority: 2,
            type: 'basic',
            silent: false
        });
    }
}
