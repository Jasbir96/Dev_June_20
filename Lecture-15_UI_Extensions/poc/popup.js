console.log("Inside popup");
let btn = document.querySelector(".click");
btn.addEventListener("click", function () {
    console.log("Popup btn was clicked")
    console.log("yha se content change ");
    // popup 
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        console.log(tabs)
        // to send message
        chrome.tabs.sendMessage(tabs[0].id, "hello from popup",function(response){
            console.log(response);
        });
    })
})