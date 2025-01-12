// TODO: Add user settings option to disable activity tracker
let isDebuggerAlreadyAttached = false
let attachedTabId = ''

function attachDebugger(details) {
    if (isDebuggerAlreadyAttached) return;
    const { tabId } = details
    if (!tabId > 0) return;

    chrome.debugger.attach(
        { tabId: tabId },
        '1.3'
    )
    .then(
        chrome.debugger.sendCommand(
            { tabId: tabId },
            'Network.enable'
        )
    )
    isDebuggerAlreadyAttached = true
    attachedTabId = tabId
}

// On startup, attach debugger
// TODO: Use chrome.tabs.onCreated and onUpdated for more robust implementation
// TODO: Fix error with filter's inability to filter out chrome:// urls, despite specifying HTTPS protocol
// https://stackoverflow.com/questions/24600495/chrome-tabs-executescript-cannot-access-a-chrome-url#comment130231485_24606853
chrome.webRequest.onBeforeRequest.addListener(attachDebugger, { urls: [ "https://*.roblox.com/*" ] });

chrome.debugger.onDetach.addListener((source, reason) => {
    isDebuggerAlreadyAttached = false
    attachedTabId = ''
})

chrome.debugger.onEvent.addListener((source, method, params) => {
    if (method === 'Network.responseReceived') {
        const { requestId } = params
        // TODO: Investigate source of "No resource with given identifier found" errors
        // https://github.com/chromedp/chromedp/issues/1317#issuecomment-1561122839
        chrome.debugger.sendCommand(
            source,
            'Network.getResponseBody',
            { requestId: requestId }
        )
        .then(result => {
            const responseBody = result.body
            isFriendActivity(responseBody)
        })
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

// TODO: Implement method to find username from user ID for notifications
// TODO: Fix notifications not appearing on screen
// TODO: Implement filter for game activity with user-friendly interface
// TODO: Add buttons to launch game client from notification
function sendActivityAlert(userPresences) {
    for (const userPresence of userPresences) {
        const { gameId, lastLocation, lastOnline, placeId, rootPlaceId, universeId, userId, userPresenceType } = userPresence
        if (!rootPlaceId) return;
        // 'Offline' = 0, 'Online' = 1, 'InGame' = 2, 'InStudio' = 3, 'Invisible' = 4
        if (userPresenceType !== 2) return;

        fetch(`https://games.roblox.com/v1/games/multiget-place-details?placeIds=${rootPlaceId}`)
        .then(response => response.json())
        .then(result => {
            const { placeId, name, description, sourceName, sourceDescription, url, builder, builderId, hasVerifiedBadge, isPlayable, reasonProhibited, universeId, universeRootPlaceId, price, imageToken } = result[0]
            chrome.notifications.create({
                iconUrl: './utils/RBLX_Tilt_Primary_Black.png',
                title: 'New Friend Activity',
                message: `${userId} is playing ${name}!`,
                priority: 2,
                type: 'basic'
            })
        })
        .catch(error => console.error(error))
    }
}