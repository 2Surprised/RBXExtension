// TODO: Prevent userhub websocket from disconnecting, or reopen connection when disconnected
// TODO: Prevent false positives as a result of the Presence API returning invalid data.
//       Check in with the Games API to check if a friend has truly left a game, as more
//       often than not, the friend never left the game they were in.
// TODO: Add user settings option to disable activity tracker
// TODO: Add user settings option to disable subplace tracker
// TODO: Add user settings option to disable automated notification deletion
import { getUserFromUserId, getAvatarIconUrlFromUserId, getDataUrlFromWebResource, RobloxPresenceRegex } from './utils/utility.js'
let isTryingToAttach = false
let isDebuggerAlreadyAttached = false
let tabTitle = ''
let attachedTabId = ''

async function attachDebugger(details) {
    if (isTryingToAttach || isDebuggerAlreadyAttached) return;
    isTryingToAttach = true
    const { tabId } = details
    if (!tabId > 0) return;
    const tab = await chrome.tabs.get(tabId)
    tabTitle = tab.title
    try {
        await chrome.debugger.attach(
            { tabId: tabId },
            '1.3'
        )
        await chrome.debugger.sendCommand(
            { tabId: tabId },
            'Network.enable'
        )
    } catch (error) {
        isTryingToAttach = false
        // When a user updates a chrome:// tab by navigating from it, this error will occur.
        // This error can be safely ignored, as the debugger is simply trying to attach to a
        // still unloading chrome:// tab. After a few tries, it'll successfully attach to the
        // newly loaded in tab.
        if (error.message === 'Cannot access a chrome:// URL') return;
        console.error(error)
    }
    isTryingToAttach = false
    isDebuggerAlreadyAttached = true
    attachedTabId = tabId
    chrome.webRequest.onBeforeRequest.removeListener(attachDebugger)
    console.log(`Attached to ${tabTitle}!`)
}

// TODO: Use chrome.debugger.getTargets() for more robust implementation
// On startup, attach debugger
chrome.webRequest.onBeforeRequest.addListener(attachDebugger, { urls: [ "https://*.roblox.com/*" ] })

chrome.debugger.onDetach.addListener(() => {
    isDebuggerAlreadyAttached = false
    attachedTabId = ''
    chrome.webRequest.onBeforeRequest.addListener(attachDebugger, { urls: [ "https://*.roblox.com/*" ] })
    console.log('The debugger has been detached.')
})

chrome.debugger.onEvent.addListener(async (source, method, params) => {
    const { requestId } = params
    if (method === 'Network.responseReceived' && params.response.url.match(RobloxPresenceRegex) && params.response.status === 200) {
        // https://github.com/chromedp/chromedp/issues/1317#issuecomment-1561122839
        // These guard nodes prevent "No resource with given identifier",
        // and "No data found for resource with given identifier" errors.
        // Some are not required since the second and third conditionals above already
        // remove them from the equation.
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
            )
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
            }, 5000)
        }
    }
})

function isFriendActivity(responseBody) {
    try {
        const object = JSON.parse(`${responseBody}`)
        if (object.userPresences && object.userPresences.length <= 3) {
            sendActivityAlert(object.userPresences)
        }
    } catch (error) {
        // TODO: Attempt switch to instanceof syntax
        if (!error.name === 'SyntaxError') {
            console.warn(error)
        }
    }
}

// TODO: Implement session cache to prevent unnecessary strain on API
// TODO: Prevent duplicate notifications from appearing for set duration
// TODO: Implement filter for game activity with user-friendly interface
// TODO: Add buttons to launch game client from notification
async function sendActivityAlert(userPresences) {
    for (const userPresence of userPresences) {
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
        if (placeId !== rootPlaceId) { isSubPlace = true }

        // TODO: Detect if a friend has joined another, then display the members of the party
        await (function fetchData() {
            return new Promise(async (resolve, _reject) => {
                const placeIdsToFetch = isSubPlace? `${rootPlaceId}&placeIds=${placeId}` : rootPlaceId
                const games = await fetch(`https://games.roblox.com/v1/games/multiget-place-details?placeIds=${placeIdsToFetch}`).then(response => response.json())
                rootPlaceName = games[0].name
                placeUrl = games[0].url
                if (isSubPlace) {
                    subPlaceName = games[1].name
                    placeUrl = games[1].url
                }
                const userObjectPromise = getUserFromUserId(userId)
                const imageUrlPromise = getAvatarIconUrlFromUserId(userId, 'avatar-headshot', 100)
                const responses = await Promise.all([userObjectPromise, imageUrlPromise])
                const userObject = responses[0]
                const imageUrl = responses[1]
                imageDataUrl = await getDataUrlFromWebResource(imageUrl)
                userDisplayName = userObject.displayName
                resolve()
            })
        })()

        notificationId = await chrome.notifications.create({
            iconUrl: imageDataUrl,
            title: !isSubPlace ? `${userDisplayName} is playing!` : `${userDisplayName} is in a subplace!`,
            message: !isSubPlace ? `Now in: ${rootPlaceName}` : `Now in: ${subPlaceName}`,
            contextMessage: !isSubPlace ? '' : `Part of: ${rootPlaceName}`,
            priority: 2,
            type: 'basic',
            silent: false
        })
    }
}