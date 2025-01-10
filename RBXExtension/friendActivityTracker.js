// let currentTab = {
//     id: 0
// }
// const version = '1.3'

// async function getRobloxTabs() {
//     const queryInfo = { url: ['https://*.roblox.com/*'] }
//     const tabs = await chrome.tabs.query(queryInfo)
//     currentTab = tabs[0]
//     return tabs
// }

// function attachListener() {
//     chrome.debugger.attach(
//         { tabId: currentTab.id },
//         version,
//         onAttach.bind(null, currentTab.id)
//     )
// }

// function onAttach() {
//     chrome.debugger.sendCommand(
//         { tabId: currentTab.id },
//         'Network.enable'
//     )
//     chrome.debugger.onEvent.addListener(eventHandler)
// }

// function eventHandler(debuggerSession, method, params) {
//     if (currentTab.id != debuggerSession.id) {
//         return
//     }

//     if (method === 'Network.responseReceived') {
//         chrome.debugger.sendCommand(
//             debuggerSession, // { tabId: debuggerSession.tabId },
//             'Network.getResponseBody',
//             { requestId: params.requestId }
//         ).then(response => {
//             console.log(response) // HTTP response body
//             chrome.debugger.detach(debuggerSession)
//         })
//     }
// }

// getRobloxTabs()
//     .then(attachListener(currentTab))

// BELOW IS WORKING (1)
// let currentTab;
// const version = "1.3";

// chrome.tabs.query( //get current Tab
//     {
//         url: ['https://*.roblox.com/*']
//     },
//     function(tabArray) {
//         currentTab = tabArray[0];
//         chrome.debugger.attach({ //debug at current tab
//             tabId: currentTab.id
//         }, version, onAttach.bind(null, currentTab.id));
//     }
// )


// function onAttach(tabId) {

//     chrome.debugger.sendCommand({ //first enable the Network
//         tabId: tabId
//     }, "Network.enable");

//     chrome.debugger.onEvent.addListener(allEventHandler);

// }


// function allEventHandler(debuggeeId, message, params) {

//     if (currentTab.id != debuggeeId.tabId) {
//         return;
//     }

//     if (message == "Network.responseReceived") { //response return 
//         chrome.debugger.sendCommand({
//             tabId: debuggeeId.tabId
//         }, "Network.getResponseBody", {
//             "requestId": params.requestId
//         }, function(response) {
//             // you get the response body here!
//             console.log(response)
//             // you can close the debugger tips by:
//             // chrome.debugger.detach(debuggeeId);
//         });
//     }

// }
// ABOVE IS WORKING (1)

var gAttached = false;
var gRequests = [];
var gObjects = [];
let attachedTab;

chrome.debugger.onEvent.addListener(function (source, method, params) {
        if (method == "Network.requestWillBeSent") {
            // If we see a url need to be handled, push it into index queue
            var rUrl = params.request.url;
            if (getTarget(rUrl) >= 0) {
                gRequests.push(rUrl);
            }
        }
        if (method == "Network.responseReceived") {
            // We get its request id here, write it down to object queue
            var eUrl = params.response.url;
            var target = getTarget(eUrl);
            if (target >= 0) {
                gObjects.push({
                    requestId: params.requestId,
                    target: target,
                    url: eUrl
                });
            }
        }
        if (method == "Network.loadingFinished" && gObjects.length > 0) {
            // Pop out the request object from both object queue and request queue
            var requestId = params.requestId;
            var object = null;
            for (var o in gObjects) {
                if (requestId == gObjects[o].requestId) {
                    object = gObjects.splice(o, 1)[0];
                    break;
                }
            }
            // Usually loadingFinished will be immediately after responseReceived
            if (object == null) {
                console.log('Failed!!');
                return;
            }
            gRequests.splice(gRequests.indexOf(object.url), 1);
            chrome.debugger.sendCommand(
                source,
                "Network.getResponseBody",
                {"requestId": requestId},
                function (response) {
                    if (response) {
                        console.log(response)
                    } else {
                        console.log("Empty response for " + object.url);
                    }
                    // If we don't have any request waiting for response, re-attach debugger
                    // since without this step it will lead to memory leak.
                    if (gRequests.length == 0) {
                        chrome.debugger.detach({
                            tabId: source.tabId
                        }, function () {
                            chrome.debugger.attach({
                                tabId: source.tabId
                            }, "1.0", function () {
                                chrome.debugger.sendCommand({
                                    tabId: source.tabId
                                }, "Network.enable");
                            });
                        });
                    }
                });
        }
    }
);

var initialListener = function (details) {
    console.log('is in initial listener now', gAttached)
    if (gAttached) return;  // Only need once at the very first request, so block all following requests
    var tabId = details.tabId;
    if (tabId > 0) {
        attachedTab = details.tabId
        gAttached = true;
        chrome.debugger.attach({
            tabId: tabId
        }, "1.0", function () {
            chrome.debugger.sendCommand({
                tabId: tabId
            }, "Network.enable");
        });
        // Remove self since the debugger is attached already
        chrome.webRequest.onBeforeRequest.removeListener(initialListener);
    }
};

const isStillAttached = function(removedTabId, removeInfo) {
    console.log('=== IS STILL ATTACHED? ===', attachedTab, removedTabId)
    if (attachedTab === removedTabId) {
        gAttached = false
        console.log('=== NO ===')
        chrome.webRequest.onBeforeRequest.addListener(initialListener, {urls: ["<all_urls>"]})
    }
}

// Attach debugger on startup
chrome.webRequest.onBeforeRequest.addListener(initialListener, {urls: ["<all_urls>"]});
// Attach debugger if tab is closed
chrome.tabs.onRemoved.addListener(isStillAttached)

// Filter if the url is what we want
function getTarget(url) {
    for (var i in TARGETS) {
        var target = TARGETS[i];
        if (url.match(target.url)) {
            return i;
        }
    }
    return -1;
}

const TARGETS = [
    {url: 'roblox.com', desc: 'target1'},
    {url: 'roblox.com/game'}
]