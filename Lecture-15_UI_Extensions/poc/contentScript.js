

// console.log("I ran")
let imgArr = document.querySelectorAll("img");
let images = ["images/img-1.jpg",
    "images/img-2.jpg",
    "images/img-3.jpg",
    "images/img-4.jpg",
    "images/img-5.jpg",
];

for (let i = 0; i < imgArr.length; i++) {
    // console.log(chrome.extension.getURL(images[0]))
    let idx = Math.floor(Math.random() * images.length);
    let url = chrome.extension.getURL(images[idx])
    console.log(url);
    imgArr[i].src = url;

}

