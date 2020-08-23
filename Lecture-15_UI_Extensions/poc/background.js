console.log("Inside background");
// chrome.tabs.onCreated.addListener(function (tab) {
//     console.log(tab);
// })

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (tab.url.includes("facebook")) {
        chrome.tabs.remove(tabId, function () {
            console.log("Tab closed");
        })
    }
})

