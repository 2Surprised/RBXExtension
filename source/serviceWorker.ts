// TODO: Implement best friends system
// TODO: Implement notes system for friends/followers/following
// TODO: Completely overhaul the Roblox website chat
// TODO: Save chat history of friends

// TODO: Prevent authenticated user from appearing in notifications
// TODO: Prevent false positives as a result of the Presence API returning invalid data.
//       Check in with the Games API to check if a friend has truly left a game, as more
//       often than not, the friend never left the game they were in.
// TODO: Add user settings option to disable subplace tracker
// TODO: Add user settings option to disable automated notification deletion
import { getUserFromUserId, getAvatarIconUrlFromUserId, getDataUrlFromWebResource, RobloxWWWRegex, RobloxLoginRegex, RobloxPresenceRegex, removeValueFromArray } from './utils/utility.ts'
// Fun fact: Even though RobloxLoginRegexMatch prevents the debugger from attaching to roblox.com/login
// tabs, the userhub websocket still works when the page is accessed through the Account Switcher feature.
// This just avoids a lengthy implementation just to check if the user is logged in or not.
const RobloxLoginRegexMatch = new RegExp(RobloxLoginRegex)
const ALERT_TIMER_FOR_DETACHED_DEBUGGER = 2000
const RETRY_TIMER_FOR_FAILED_REQUESTS = 5000
const RESET_TIMER_FOR_RECENT_USER_PRESENCE = 15000
const MAXIMUM_USER_PRESENCES_HANDLED_IN_SINGLE_REQUEST = 3
let isTryingToAttach = false
let isDebuggerAlreadyAttached = false
let tabTitle = ''
let attachedTabId = 0

async function attachDebugger(tabs?: chrome.tabs.Tab[], details?: chrome.webRequest.WebRequestBodyDetails) {
    if (isTryingToAttach || isDebuggerAlreadyAttached) return;
    isTryingToAttach = true
    let tabId = 0
    let tab: chrome.tabs.Tab | undefined;

    if (tabs) {
        for (const tabInQuestion of tabs) {
            if (tabInQuestion.status !== 'unloaded' && !RobloxLoginRegexMatch.test(tabInQuestion.url!)) {
                tabId = tabInQuestion.id!
                tab = tabInQuestion
                break;
            }
        }
    } else {
        const tabInQuestion = await chrome.tabs.get(details!.tabId)
        // chrome.webRequest.onBeforeRequest can trigger on tabs that aren't www.roblox.com
        if (!tabInQuestion.url?.match(RobloxWWWRegex) || RobloxLoginRegexMatch.test(tabInQuestion.url)) {
            isTryingToAttach = false
            return;
        }
        ({ tabId } = details!)
        tab = tabInQuestion
    }

    if (!(tabId > 0)) {
        isTryingToAttach = false
        return;
    }

    try {
        await chrome.debugger.attach({ tabId: tabId }, '1.3')
        await chrome.debugger.sendCommand({ tabId: tabId }, 'Network.enable')
    } catch (error) {
        isTryingToAttach = false
        // When a user updates a chrome:// tab by navigating from it, this error will occur.
        // This error can be safely ignored, as the debugger is simply trying to attach to a
        // still unloading chrome:// tab. After a few tries, it'll successfully attach to the
        // newly loaded in tab.
        // @ts-expect-error: No need to handle unknown error type
        if (error.message === 'Cannot access a chrome:// URL') return;
        console.error(error)
    }

    // @ts-expect-error: removeListener doesn't return anything
    chrome.webRequest.onBeforeRequest.removeListener(attachDebugger)
    isTryingToAttach = false
    isDebuggerAlreadyAttached = true
    attachedTabId = tabId
    chrome.storage.session.set({ debuggerState: 'attached' })

    tabTitle = tab!.title!
    console.log(`Currently attached to: ${tabTitle}`)
}

function attemptToAttachDebugger() {
    chrome.tabs.query({ url: "https://www.roblox.com/*" }, (tabs) => { attachDebugger(tabs, undefined) })
    chrome.webRequest.onBeforeRequest.addListener((details) => { attachDebugger(undefined, details) }, { urls: [ "https://www.roblox.com/*" ] })
}

function onDetach() {
    isDebuggerAlreadyAttached = false
    attachedTabId = 0
    console.log('The debugger has been detached.')
    attemptToAttachDebugger()
    alertIfDebuggerIsDetached(AlertIfDebuggerIsDetachedAction.Warn)
}

function onDetachWithoutReattach() {
    isDebuggerAlreadyAttached = false
    attachedTabId = 0
    console.log('The debugger has been disabled.')
    alertIfDebuggerIsDetached(AlertIfDebuggerIsDetachedAction.Suppress)
}

function alertIfDebuggerIsDetached(action: AlertIfDebuggerIsDetachedAction) {
    chrome.storage.session.set({ debuggerState: 'detached' })
    if (action !== 'warn') return;
    setTimeout(() => {
        if (isDebuggerAlreadyAttached) return;
        chrome.notifications.create({
            iconUrl: './utils/RBLX_Tilt_Primary_Black.png',
            title: 'Friend Activity Tracker is disabled!',
            message: 'You will no longer receive notifications on friend activity.',
            contextMessage: 'To reenable, make sure to keep the website open and stay logged in!',
            priority: 2,
            type: 'basic',
            silent: false
        })
    }, ALERT_TIMER_FOR_DETACHED_DEBUGGER)
}

// On startup, attach debugger if feature is enabled
(async function init() {
    chrome.storage.session.set({ debuggerState: 'detached' })
    const items = await chrome.storage.sync.get({ enableFriendActivityTracker: true })
    if (items.enableFriendActivityTracker) {
        attemptToAttachDebugger()
        // On detach, attempt to attach again
        chrome.debugger.onDetach.addListener(onDetach)
    }
})()

// When feature is enabled/disabled, attach/remove debugger
chrome.storage.sync.onChanged.addListener(changes => {
    if (!changes.enableFriendActivityTracker) return;
    if (changes.enableFriendActivityTracker.newValue === false) {
        if (!attachedTabId) return;
        chrome.debugger.detach({ tabId: attachedTabId }, onDetachWithoutReattach)
    } else {
        attemptToAttachDebugger()
    }
})

// Detach debugger if no longer on www.roblox.com
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tabId !== attachedTabId) return;
    tabTitle = tab.title!
    if (!changeInfo.url) return;
    if (!changeInfo.url.match(RobloxWWWRegex) || RobloxLoginRegexMatch.test(changeInfo.url)) {
        // This does not trigger the onDetach event for the debugger, so the callback is necessary
        chrome.debugger.detach({ tabId: attachedTabId }, onDetach)
    }
})

chrome.debugger.onEvent.addListener(async (source, method, params: any) => {
    const { requestId } = params

    if (method === 'Network.responseReceived' &&
        params.response.url.match(RobloxPresenceRegex) &&
        params.response.status === 200
    ) {
        // https://github.com/chromedp/chromedp/issues/1317#issuecomment-1561122839
        // These guard nodes prevent "No resource with given identifier",
        // and "No data found for resource with given identifier" errors.
        // Some are not required since the second and third conditionals above
        // already remove them from the equation.
        if (params.type === 'Preflight') return;
        // "unknown" seems to be caused by local files being fetched, and any redirects to local files,
        // which somehow causes the remote debugging protocol to be unable to retrieve their contents.
        // Oddly enough, it seems like many other requests from the disk cache succeed, so the local
        // files might be stored in long-term storage instead of in caches and RAM.
        // if (params.response.securityState === 'unknown') return; // (Not required)
        if (params.response.headers["content-length"] === 0) return;
        // if (params.response.status === 204) return; // Ignore HTTP 204 No Content successes (Not required)
        // The document will have no data when the response is first received, while fonts never have data
        // if (params.type === 'Document' || params.type === 'Font') return; // (Not required)

        async function getResponseBodyAndPassOnData() {
            const result = await chrome.debugger.sendCommand(
                source,
                'Network.getResponseBody',
                { requestId: requestId }
            ) as ResponseBody
            const responseBody = result.body
            isFriendActivity(responseBody)
        }

        try {
            await getResponseBodyAndPassOnData()
        } catch (error) {
            console.warn('Failed to retrieve response body, will retry in a few seconds.', requestId, params, error)
            // This is a hacky solution, but if the original retrieval of the response body fails,
            // this will simply wait a few seconds before attempting another retrieval.
            setTimeout(() => {
                getResponseBodyAndPassOnData()
                .catch(error => console.error('Failed to retrieve response body.', requestId, params, error))
            }, RETRY_TIMER_FOR_FAILED_REQUESTS)
        }
    }
})

function isFriendActivity(responseBody: string) {
    try {
        const object = JSON.parse(responseBody)
        if ('userPresences' in object && object.userPresences.length <= MAXIMUM_USER_PRESENCES_HANDLED_IN_SINGLE_REQUEST) {
            const userPresences: UserPresencesResponse = object
            sendActivityAlert(userPresences.userPresences)
        }
    } catch (error) {
        if (!(error instanceof SyntaxError)) {
            console.warn(error)
        }
    }
}

// TODO: Implement session cache to prevent unnecessary strain on API
// TODO: Implement filter for game activity with user-friendly interface
// TODO: Add buttons to launch game client from notification
const recentUserPresences: string[] = []

async function sendActivityAlert(userPresences: UserPresence[]) {
    for (const userPresence of userPresences) {
        // Prevents duplicate notifications from coming through
        if (recentUserPresences.includes(JSON.stringify(userPresence))) continue;
        recentUserPresences.push(JSON.stringify(userPresence))
        setTimeout(() => {
            removeValueFromArray(recentUserPresences, JSON.stringify(userPresence))
        }, RESET_TIMER_FOR_RECENT_USER_PRESENCE)

        const { placeId, rootPlaceId, userId, userPresenceType } = userPresence
        if (!rootPlaceId) return;
        if (userPresenceType !== 2) return; // 'Offline' = 0, 'Online' = 1, 'InGame' = 2, 'InStudio' = 3, 'Invisible' = 4
        
        let isSubPlace = false
        let rootPlaceName = ''
        let subPlaceName = ''
        // TODO: Lead user to the game's page when clicking on notification
        let placeUrl = ''
        let userDisplayName = ''
        let imageDataUrl = ''
        // TODO: Create self-deleting notifications
        let notificationId = ''
        isSubPlace = placeId !== rootPlaceId

        // TODO: Detect if a friend has joined another, then display the members of the party
        await (async function fetchData() {
            const placeIdsToFetch = isSubPlace? `${rootPlaceId}&placeIds=${placeId}` : rootPlaceId
            const games = await fetch(`https://games.roblox.com/v1/games/multiget-place-details?placeIds=${placeIdsToFetch}`).then(response => response.json())
            rootPlaceName = games[0].name
            placeUrl = games[0].url
            if (isSubPlace) {
                subPlaceName = games[1].name
                placeUrl = games[1].url
            }
            const userObjectPromise = getUserFromUserId(userId)
            const imageUrlPromise = getAvatarIconUrlFromUserId(userId, AvatarIconStyle.avatarHeadshot, AvatarIconSize.Hundred)
            const responses = await Promise.all([userObjectPromise, imageUrlPromise])
            const userObject = responses[0]
            const imageUrl = responses[1]
            imageDataUrl = await getDataUrlFromWebResource(imageUrl)
            userDisplayName = userObject.displayName
        })()

        chrome.notifications.create({
            iconUrl: imageDataUrl,
            title: !isSubPlace ? `${userDisplayName} is playing!` : `${userDisplayName} is in a subplace!`,
            message: !isSubPlace ? `Now in: ${rootPlaceName}` : `Now in: ${subPlaceName}`,
            contextMessage: !isSubPlace ? '' : `Part of: ${rootPlaceName}`,
            priority: 2,
            type: 'basic',
            silent: false
        }, (notifId => { notificationId = notifId }))
    }
}