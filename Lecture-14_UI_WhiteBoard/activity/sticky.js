function createSticky() {
    //     <div class="stickyPad">
    //     <div class="navbar">
    //         <div class="close"></div>
    //         <div class="minimize"></div>
    //     </div>
    //     <div class="container"><textarea name="" id="" cols="30" rows="10"></textarea></div>
    // </div>  
    //  create all the required divs
    let stickyPad = document.createElement("div");
    let navBar = document.createElement("div");
    let close = document.createElement("div");
    let minimize = document.createElement("div");
    let container = document.createElement("div");
    let textarea = document.createElement("textarea");
    // create subtree
    stickyPad.appendChild(navBar);
    stickyPad.appendChild(container);
    navBar.appendChild(close);
    navBar.appendChild(minimize);
    container.appendChild(textarea);
    //  add styling to them using css classes
    stickyPad.setAttribute("class", "stickyPad");
    navBar.setAttribute("class", "navBar");
    close.setAttribute("class", "close");
    minimize.setAttribute("class", "minimize");
    container.setAttribute("class", "container");
    textarea.setAttribute("class", "textarea");

    // append it body
    document.body.appendChild(stickyPad);
}