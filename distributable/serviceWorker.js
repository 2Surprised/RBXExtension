import { getUserFromUserId, getAvatarIconUrlFromUserId, getDataUrlFromWebResource, RobloxWWWRegex, RobloxLoginRegex, RobloxPresenceRegex, removeValueFromArray } from "./utils/utility.js";
(async function init() {
    const items = await chrome.storage.sync.get({
        enableFriendActivityTracker: true,
        enableFriendCarouselExtension: true,
        enableAvatarHeadshotURLRedirect: true,
        enableUnfriendBlocker: true
    });
    if (items.enableFriendActivityTracker) {
        FriendActivityTracker(true);
    }
    if (items.enableFriendCarouselExtension) {
        FriendCarouselExtension(true);
    }
    if (items.enableAvatarHeadshotURLRedirect) {
        AvatarHeadshotURLRedirect(true);
    }
    if (items.enableUnfriendBlocker) {
        UnfriendBlocker(true);
    }
    chrome.storage.sync.onChanged.addListener(changes => {
        if ('enableFriendActivityTracker' in changes) {
            changes.enableFriendActivityTracker.newValue === true ?
                FriendActivityTracker(true) :
                FriendActivityTracker(false);
        }
        if ('enableFriendCarouselExtension' in changes) {
            changes.enableFriendCarouselExtension.newValue === true ?
                FriendCarouselExtension(true) :
                FriendCarouselExtension(false);
        }
        if ('enableAvatarHeadshotURLRedirect' in changes) {
            changes.enableAvatarHeadshotURLRedirect.newValue === true ?
                AvatarHeadshotURLRedirect(true) :
                AvatarHeadshotURLRedirect(false);
        }
        if ('enableUnfriendBlocker' in changes) {
            changes.enableUnfriendBlocker.newValue === true ?
                UnfriendBlocker(true) :
                UnfriendBlocker(false);
        }
    });
})();
let isFriendActivityTrackerInitialExecution = true;
let isTryingToAttach = false;
let isDebuggerAlreadyAttached = false;
let tabTitle = '';
let attachedTabId = 0;
async function FriendActivityTracker(enable) {
    const RobloxLoginRegexMatch = new RegExp(RobloxLoginRegex);
    const ALERT_TIMER_FOR_DETACHED_DEBUGGER = 10000;
    const RETRY_TIMER_FOR_FAILED_REQUESTS = 5000;
    const RESET_TIMER_FOR_RECENT_USER_PRESENCE = 15000;
    const MAXIMUM_USER_PRESENCES_HANDLED_IN_SINGLE_REQUEST = 3;
    if (!enable) {
        if (isDebuggerAlreadyAttached) {
            chrome.debugger.detach({ tabId: attachedTabId });
            onDetach(false);
        }
        return;
    }
    if (isFriendActivityTrackerInitialExecution) {
        isFriendActivityTrackerInitialExecution = false;
        chrome.storage.session.set({ debuggerState: 'detached' });
        chrome.debugger.onDetach.addListener(() => { onDetach(true); });
        chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
            if (tabId !== attachedTabId)
                return;
            tabTitle = tab.title;
            if (!changeInfo.url)
                return;
            if (!changeInfo.url.match(RobloxWWWRegex) || RobloxLoginRegexMatch.test(changeInfo.url)) {
                chrome.debugger.detach({ tabId: attachedTabId });
                onDetach(true);
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
        attemptToAttachDebugger();
    }
    else {
        attemptToAttachDebugger();
    }
    function attemptToAttachDebugger() {
        chrome.tabs.query({ url: "https://www.roblox.com/*" }, attemptToAttachDebuggerCallback);
        chrome.webRequest.onBeforeRequest.addListener(attemptToAttachDebuggerCallback, { urls: ["https://www.roblox.com/*"] });
    }
    function attemptToAttachDebuggerCallback(object) {
        if (Array.isArray(object)) {
            attachDebugger(object, undefined);
        }
        else {
            attachDebugger(undefined, object);
        }
    }
    async function attachDebugger(tabs, details) {
        if (isTryingToAttach || isDebuggerAlreadyAttached)
            return;
        isTryingToAttach = true;
        let tabId = 0;
        let tab;
        if (tabs) {
            for (const tabInQuestion of tabs) {
                if (tabInQuestion.status !== 'unloaded' && !RobloxLoginRegexMatch.test(tabInQuestion.url)) {
                    tabId = tabInQuestion.id;
                    tab = tabInQuestion;
                    break;
                }
            }
        }
        else if (details) {
            const tabInQuestion = await chrome.tabs.get(details.tabId);
            if (!tabInQuestion.url?.match(RobloxWWWRegex) || RobloxLoginRegexMatch.test(tabInQuestion.url)) {
                isTryingToAttach = false;
                return;
            }
            ({ tabId } = details);
            tab = tabInQuestion;
        }
        if (!(tabId > 0)) {
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
        chrome.webRequest.onBeforeRequest.removeListener(attemptToAttachDebuggerCallback);
        isTryingToAttach = false;
        isDebuggerAlreadyAttached = true;
        attachedTabId = tabId;
        chrome.storage.session.set({ debuggerState: 'attached' });
        tabTitle = tab.title;
        console.log(`Currently attached to: ${tabTitle}`);
    }
    function onDetach(reattach) {
        isDebuggerAlreadyAttached = false;
        attachedTabId = 0;
        chrome.storage.session.set({ debuggerState: 'detached' });
        if (reattach) {
            console.log('The debugger has been detached.');
            attemptToAttachDebugger();
            alertIfDebuggerIsDetached();
        }
        else {
            console.log('The debugger has been disabled.');
        }
    }
    function alertIfDebuggerIsDetached() {
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
    function isFriendActivity(responseBody) {
        try {
            const object = JSON.parse(responseBody);
            if ('userPresences' in object && object.userPresences.length <= MAXIMUM_USER_PRESENCES_HANDLED_IN_SINGLE_REQUEST) {
                const userPresencesObject = object;
                sendActivityAlert(userPresencesObject.userPresences);
            }
        }
        catch (error) {
            if (!(error instanceof SyntaxError)) {
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
            let userDisplayName = '';
            let imageDataUrl = '';
            isSubPlace = placeId !== rootPlaceId;
            const placeIdsToFetch = isSubPlace ? `${rootPlaceId}&placeIds=${placeId}` : rootPlaceId;
            const games = await fetch(`https://games.roblox.com/v1/games/multiget-place-details?placeIds=${placeIdsToFetch}`).then(response => response.json());
            rootPlaceName = games[0].name;
            if (isSubPlace) {
                subPlaceName = games[1].name;
            }
            const userObjectPromise = getUserFromUserId(userId);
            const imageUrlPromise = getAvatarIconUrlFromUserId(userId, "avatar-headshot", 100);
            const responses = await Promise.all([userObjectPromise, imageUrlPromise]);
            const userObject = responses[0];
            const imageUrl = responses[1];
            imageDataUrl = await getDataUrlFromWebResource(imageUrl);
            userDisplayName = userObject.displayName;
            chrome.notifications.create({
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
}
function FriendCarouselExtension(enable) {
    if (enable) {
        chrome.declarativeNetRequest.updateEnabledRulesets({
            enableRulesetIds: ['ruleset_FriendCarouselExtension']
        });
    }
    else {
        chrome.declarativeNetRequest.updateEnabledRulesets({
            disableRulesetIds: ['ruleset_FriendCarouselExtension']
        });
    }
}
function AvatarHeadshotURLRedirect(enable) {
    if (enable) {
        chrome.declarativeNetRequest.updateEnabledRulesets({
            enableRulesetIds: ['ruleset_AvatarHeadshotURLRedirect']
        });
    }
    else {
        chrome.declarativeNetRequest.updateEnabledRulesets({
            disableRulesetIds: ['ruleset_AvatarHeadshotURLRedirect']
        });
    }
}
function UnfriendBlocker(enable) {
    if (enable) {
        chrome.declarativeNetRequest.updateEnabledRulesets({
            enableRulesetIds: ['ruleset_UnfriendBlocker']
        });
    }
    else {
        chrome.declarativeNetRequest.updateEnabledRulesets({
            disableRulesetIds: ['ruleset_UnfriendBlocker']
        });
    }
}
