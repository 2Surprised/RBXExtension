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
chrome.webRequest.onBeforeRequest.addListener(attachDebugger, { urls: [ "https://*.roblox.com/*" ] });

chrome.debugger.onDetach.addListener((source, reason) => {
    isDebuggerAlreadyAttached = false
    attachedTabId = ''
})

chrome.debugger.onEvent.addListener((source, method, params) => {
    if (method === 'Network.responseReceived') {
        const { requestId } = params

        // TODO: Possible source of "No resource with given identifier found" errors
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

function isFriendActivityOrGameDetails(responseBody) {
    console.log(responseBody)
    try {
        const object = JSON.parse(responseBody)
        if (object.userPresences && userPresences.length <= 3) {
            sendActivityAlert(object.userPresences)
        }
    } catch (error) {
        if (!error.message === 'SyntaxError') { // If it's not invalid JSON
            console.warn('isFriendActivity', error)
        }
    }
}

function sendActivityAlert(userPresences) {
    for (const userPresence of userPresences) {
        const { gameId, lastLocation, lastOnline, placeId, rootPlaceId, universeId, userId, userPresenceType } = userPresence

        // TODO: Obtain icon URL, title, and display message

        chrome.notifications.create({
            iconUrl: ``,
            title: ``,
            message: ``,
            priority: 2,
            type: 'basic'
        })
    }
}