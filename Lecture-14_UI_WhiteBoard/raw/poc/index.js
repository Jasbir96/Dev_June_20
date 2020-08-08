// // to create a element
// let pTag = document.createElement("p");
// // set text 
// pTag.innerText = "Dynamically generated text from Js";
// //  find an element
// let bodyNode = document.querySelector("body");
// // append a node
// bodyNode.appendChild(pTag);
// let ul = document.querySelector("ul");
// // set text
// ul.innerHTML=`<li>First Item</li>
// <li>Second Item</li>
// <li>Third Item</li>
// <li>Fourth Item</li>
// `;
// // styling 
// ul.style.backgroundColor="red";
let submitBtn = document.querySelector("#click");
let itemBox = document.querySelector("#item");
let ul = document.querySelector("ul");
submitBtn.addEventListener("click", function () {
    // alert("btn was clicked");
 if(itemBox.value){ 
    let val = itemBox.value;
    let li = document.createElement("li");
    li.innerText = val;
    ul.appendChild(li);
    itemBox.value = "";}else{
        alert("Enter some data");    }
})






