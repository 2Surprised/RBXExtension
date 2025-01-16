// TODO: Prevent userhub websocket from disconnecting, or reopen connection when disconnected
// TODO: Remove event listeners after use
// TODO: Add user settings option to disable activity tracker
// TODO: Add user settings option to disable subplace tracker
// TODO: Add user settings option to disable automated notification deletion
import { getUserFromUserId, getAvatarIconUrlFromUserId, getDataUrlFromWebResource, RobloxPresenceRegex } from './utils/utility.js'
let isDebuggerAlreadyAttached = false
let tabTitle = ''
let attachedTabId = ''

async function attachDebugger(details) {
    try {
        const { tabId } = details
        if (isDebuggerAlreadyAttached) return;
        if (!tabId > 0) return;
        const tab = await chrome.tabs.get(tabId)
        tabTitle = tab.title
        await chrome.debugger.attach(
            { tabId: tabId },
            '1.3'
        )
        await chrome.debugger.sendCommand(
            { tabId: tabId },
            'Network.enable'
        )
        isDebuggerAlreadyAttached = true
        attachedTabId = tabId
        console.log(`Attached to ${tabTitle}`)
    } catch (error) {
        console.error(error, 'type:', typeof(error), 'tab title:', tabTitle, 'is attached?:', isDebuggerAlreadyAttached)
    }
}

// TODO: Use chrome.tabs.onCreated and onUpdated for more robust implementation
// TODO: Fix error with filter's inability to filter out chrome:// urls, despite specifying HTTPS protocol
// https://stackoverflow.com/questions/24600495/chrome-tabs-executescript-cannot-access-a-chrome-url#comment130231485_24606853
// On startup, attach debugger
chrome.webRequest.onBeforeRequest.addListener(attachDebugger, { urls: [ "https://*.roblox.com/*" ] })

chrome.debugger.onDetach.addListener(() => {
    isDebuggerAlreadyAttached = false
    attachedTabId = ''
})

chrome.debugger.onEvent.addListener(async (source, method, params) => {
    if (method === 'Network.responseReceived' && params.response.url.match(RobloxPresenceRegex) && params.response.status === 200) {
        const { requestId } = params
        // TODO: Investigate source of "No resource with given identifier found" errors
        // https://github.com/chromedp/chromedp/issues/1317#issuecomment-1561122839
        // TODO: Investigate source of "No data found for resource with given identifier" errors
        const result = await chrome.debugger.sendCommand(
            source,
            'Network.getResponseBody',
            { requestId: requestId }
        )
        const responseBody = result.body
        isFriendActivity(responseBody)
    }
})

function isFriendActivity(responseBody) {
    try {
        const object = JSON.parse(`${responseBody}`)
        if (object.userPresences && object.userPresences.length <= 3) {
            sendActivityAlert(object.userPresences)
        }
    } catch (error) {
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
        let placeUrl = ''
        let userDisplayName = ''
        let imageDataUrl = ''
        // TODO: Create self-deleting notifications
        let notificationId = ''
        if (placeId !== rootPlaceId) { isSubPlace = true }

        // TODO: Detect if a friend has joined another, then display the members of the party
        // TODO: Lead user to the game's page when clicking on notification
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
                const imageUrlPromise = getAvatarIconUrlFromUserId(userId)
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