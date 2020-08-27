
let blockList = [];
chrome.runtime.onMessage.addListener
    (function (request, sender, sendResponse) {
        let newEntry = request;
        console.log(newEntry)
        blockList.push({ site: newEntry, time: 10 })
        console.log(sender);
        sendResponse(true);
    });

    //  polling
    

