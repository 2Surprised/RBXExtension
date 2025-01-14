// !! TODO: Prevent userhub websocket from disconnecting, or reopen connection when disconnected
// TODO: Remove event listeners after use
// TODO: Attempt switch to async await syntax
// TODO: Add user settings option to disable activity tracker
import { getUserFromUserId, getAvatarIconUrlFromUserId, getDataUrlFromWebResource } from './utils/utility.js'
let isDebuggerAlreadyAttached = false
let attachedTabId = ''

function attachDebugger(details) {
    const { tabId } = details
    if (isDebuggerAlreadyAttached) return;
    if (!tabId > 0) return;

    chrome.debugger.attach(
        { tabId: tabId },
        '1.3'
    )
    .then(() => {
        chrome.debugger.sendCommand(
            { tabId: tabId },
            'Network.enable'
        )
        isDebuggerAlreadyAttached = true
        attachedTabId = tabId
    })
}

// On startup, attach debugger
// TODO: Use chrome.tabs.onCreated and onUpdated for more robust implementation
// TODO: Fix error with filter's inability to filter out chrome:// urls, despite specifying HTTPS protocol
// https://stackoverflow.com/questions/24600495/chrome-tabs-executescript-cannot-access-a-chrome-url#comment130231485_24606853
chrome.webRequest.onBeforeRequest.addListener(attachDebugger, { urls: [ "https://*.roblox.com/*" ] })

chrome.debugger.onDetach.addListener(() => {
    isDebuggerAlreadyAttached = false
    attachedTabId = ''
})

chrome.debugger.onEvent.addListener((source, method, params) => {
    if (!method === 'Network.responseReceived') return;
    const { requestId } = params
    // TODO: Investigate source of "No resource with given identifier found" errors
    // https://github.com/chromedp/chromedp/issues/1317#issuecomment-1561122839
    // TODO: Investigate source of "No data found for resource with given identifier" errors
    chrome.debugger.sendCommand(
        source,
        'Network.getResponseBody',
        { requestId: requestId }
    )
    .then(result => {
        const responseBody = result.body
        isFriendActivity(responseBody)
    })
})

function isFriendActivity(responseBody) {
    try {
    } catch (error) {
        if (!error.name === 'SyntaxError') {
            console.warn(error)
        }
    }
    if (object.userPresences && object.userPresences.length <= 3) {
        sendActivityAlert(object.userPresences)
    }
}

// TODO: Implement session cache to prevent unnecessary strain on API
// TODO: Prevent duplicate notifications from appearing for set duration
// TODO: Implement filter for game activity with user-friendly interface
// TODO: Add buttons to launch game client from notification
async function sendActivityAlert(userPresences) {
    for (const userPresence of userPresences) {
        const { placeId, rootPlaceId, userId, userPresenceType } = userPresence
        const isSubPlace = false
        if (!rootPlaceId) return;
        if (userPresenceType !== 2) return; // 'Offline' = 0, 'Online' = 1, 'InGame' = 2, 'InStudio' = 3, 'Invisible' = 4
        if (placeId !== rootPlaceId) { isSubPlace = true }

        // TODO: Handle teleports to subplaces differently
        const games = await fetch(`https://games.roblox.com/v1/games/multiget-place-details?placeIds=${rootPlaceId}`).then(response => response.json())
        const { name } = games[0]
        const userObject = getUserFromUserId(userId)
        const imageUrl = getAvatarIconUrlFromUserId(userId)
        const imageData = getDataUrlFromWebResource(imageUrl)
        const userDisplayName = userObject.displayName

        Promise.all([userObject, imageUrl, imageData])
        .then(
            chrome.notifications.create({
                iconUrl: imageData,
                title: `${userDisplayName} is playing!`,
                message: `Now in: ${name}`,
                contextMessage: '',
                priority: 2,
                type: 'basic',
                silent: false
            })
        )
        .catch(error => {
            console.error(error)
        })
    }
}