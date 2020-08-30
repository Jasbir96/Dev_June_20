let blockList = [];

// recive site => add to blocklist

chrome.runtime.onMessage.addListener
    (async function (request, sender, sendResponse) {
        if (request.type == "getList") {
            return sendResponse(blockList);
        } else if (request.type == "remove") {
            // request.site
            await removeFromList(request.site);
            blockList = blockList.filter(function (urlObj) {
                return urlObj.site != request.site;
            });
            chrome.browserAction.setBadgeText({ text: "" });
            return sendResponse("removed");
        }
        else {
            // add movie to blocklist
            let newEntry = request.link;
            // console.log(newEntry)
            const movieObj = { site: newEntry, time: 10 }
            blockList.push(movieObj)
            // console.log(sender);
            console.log(movieObj)
            await setInStorage(movieObj)
            return sendResponse(true);
        }
    });
//  polling
// tracker
async function tracker() {
    if (blockList.length > 0) {
        // active tab request 
        let tab = await getTab();
        console.log(tab);
        if (tab) {
            let cURl = tab.url;
            for (let i = 0; i < blockList.length; i++) {
                let isUsing = (cURl).includes(blockList[i].site);
                if (isUsing) {
                    blockList[i].time--;
                    // update 
                    chrome.browserAction.setBadgeText({ text: blockList[i].time + "" });
                    // console.log(blockList[i].time);
                    if (blockList[i].time <= 0) {
                        // console.log("close tab");
                        chrome.browserAction.setBadgeText({ text: "" });
                        await removeTab(tab);
                        console.log("Tab closed");
                    }
                }
            }
        }
        // loop block list 
        //  ?decrement time
        // block website
    }
    console.log("polling");
}
// start ext
function init() {
   
    getList().then(function (listObj) {
        for (let url in listObj) {
            let cblockListObj = listObj[url];
            console.log(url);
            console.log(cblockListObj);
            blockList.push(cblockListObj);
        }
        setInterval(tracker, 1000);
        //  blockList = list.movies;
    })
}
init();

// setList();




function getTab() {
    return new Promise(function (resolve, reject) {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            resolve(tabs[0])
        })
    })
}

function removeTab(tab) {
    return new Promise(function (resolve, reject) {
        chrome.tabs.remove(tab.id, function () {
            resolve(true);
        })
    })

}


function getList() {
    return new Promise(function (resolve, reject) {
        chrome.storage.sync.get(null, function (movieObjs) {
            resolve(movieObjs);
        });
    })
}

async function setInStorage(tobeBlockedObj) {
    return new Promise(async function (resolve, reject) {
        // all blocked site obj
        let blockListObj = await getList();
        //  added curr blocklist obj => site: blocklist
        blockListObj[tobeBlockedObj.site] = tobeBlockedObj;
        chrome.storage.sync.set(blockListObj, function () {
            // get all movies=> upaate that obj your current  movie obj
            resolve();
        });
    })
}
function clearStorage() {
    return new Promise(function (resolve, reject) {
        chrome.storage.sync.clear(function () {
            console.log("cleared Mem");
            resolve();
        })
    })
}
function removeFromList(site) {
    return new Promise(function (resolve, reject) {
        chrome.storage.sync.remove(site, function () {
            resolve();
        })
    })
}



