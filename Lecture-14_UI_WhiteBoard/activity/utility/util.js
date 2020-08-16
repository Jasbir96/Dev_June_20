function createBox() {
    // created
    let stickyPad = document.createElement("div");
    let navBar = document.createElement("div");
    let close = document.createElement("div");
    let minimize = document.createElement("div");
    let container = document.createElement("div");
    // subtree
    stickyPad.appendChild(navBar);
    stickyPad.appendChild(container);
    navBar.appendChild(close);
    navBar.appendChild(minimize);
    // styling
    stickyPad.setAttribute("class", "stickyPad");
    navBar.setAttribute("class", "navBar");
    close.setAttribute("class", "close");
    minimize.setAttribute("class", "minimize");
    container.setAttribute("class", "container");
    //  appended in body
    document.body.appendChild(stickyPad);

    let initialX = null;
    let initialY = null;
    let isStickyDown = false;
    // event listener
    navBar.addEventListener("mousedown", function (e) {
        // initial point
        initialX = e.clientX
        initialY = e.clientY
        isStickyDown = true;
    })
    board.addEventListener("mousemove", function (e) {
        if (isStickyDown == true) {
            // final point 
            let finalX = e.clientX;
            let finalY = e.clientY;
            //  distance
            let dx = finalX - initialX;
            let dy = finalY - initialY;
            //  move sticky
            let { top, left } = stickyPad.getBoundingClientRect()
            // stickyPad.style.top=10+"px";
            stickyPad.style.top = top + dy + "px";
            stickyPad.style.left = left + dx + "px";
            initialX = finalX;
            initialY = finalY;
        }
    })

    window.addEventListener("mouseup", function () {
        isStickyDown = false;
    })

    close.addEventListener("click", function () {
        stickyPad.remove();
    })
    let flag = true;
    minimize.addEventListener("click", function () {

        if (flag == true) {
            container.style.display = "none";
        } else {
            container.style.display = "block";

        }
        flag = !flag;
    })
    return container;
}