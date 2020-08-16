function createSticky() {
    //     <div class="stickyPad">
    //     <div class="navbar">
    //         <div class="close"></div>
    //         <div class="minimize"></div>
    //     </div>
    //     <div class="container"><textarea name="" id="" cols="30" rows="10"></textarea></div>
    // </div>  
    //  create all the required divs
    let conatiner = createBox();
    let textarea =
        document.createElement("textarea");
    // create subtree
    conatiner.appendChild(textarea);
    //  add styling to them using css classes
    textarea.setAttribute("class", "textarea");
    // append it body
}