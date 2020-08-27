
let input = document.querySelector("input");
let ul = document.querySelector("ul");
let button = document.querySelector(".btn");
// user input 
button.addEventListener("click", async function () {
    //  send message
    let toBeBlocked = input.value;
    if (toBeBlocked) {
        await sendMessage(toBeBlocked);
        let li = document.createElement("li");
        li.setAttribute("class", "list-group-item");
        li.innerHTML = toBeBlocked + '<i class="fas fa-times"></i>';
        ul.appendChild(li);
        input.value = '';
        let i = li.querySelector("i");
        i.addEventListener("click", function () {
            i.parentNode.remove();
        })
    }
})
// popup
function sendMessage(toBeBlocked) {
    return new Promise(function (resolve,reject) {
        chrome.runtime.sendMessage(toBeBlocked, function (response) {
            resolve(response)
        });
    })

}
// falsy values => "",null, false, 0 ,undefined