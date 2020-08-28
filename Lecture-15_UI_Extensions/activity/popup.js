
let input = document.querySelector("input");
let ul = document.querySelector("ul");
let button = document.querySelector(".btn");
// user input 

button.addEventListener("click", async function () {
    //  send message
    let toBeBlocked = input.value;
    if (toBeBlocked) {
        await sendMessage({
            type: "url",
            link: toBeBlocked
        });
        
            addToList(toBeBlocked);
        input.value = '';
    }
})
// popup

// IIFEE=> db => ui 
async function init() {
    let blockList = await sendMessage({ type: "getList" });
    for (let i = 0; i < blockList.length; i++) {
        addToList(blockList[i].site);
    }
}
init();
// falsy values => "",null, false, 0 ,undefined
// utils
function sendMessage(message) {
    return new Promise(function (resolve, reject) {
        chrome.runtime.sendMessage(message, function (response) {
            resolve(response)
        });
    })
}
function addToList(toBeBlocked) {
    let li = document.createElement("li");
    li.setAttribute("class", "list-group-item");
    li.innerHTML = toBeBlocked + '<i class="fas fa-times"></i>';
    ul.appendChild(li);
    let i = li.querySelector("i");
    i.addEventListener("click", async function () {
        // send message remove
        let site = i.parentNode.textContent;
        // console.log(site)
        await sendMessage({ type: "remove", site });
        i.parentNode.remove();
    })
}
