
let ispendown = false;
board.addEventListener("mousedown", function (e) {
    // path start
    let x = e.clientX;
    let y = e.clientY;
   let top= getPosition();
   y = y - top;
    //  move to
    ctx.moveTo(x, y);
    ispendown = true;
})
board.addEventListener("mousemove", function (e) {
    //  lineto 
    let x = e.clientX;
    let y = e.clientY;
    let top= getPosition();
    y = y - top;
    if (ispendown == true) {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
    // repeat
})

board.addEventListener("mouseup", function (e) {
    // mouse up
    ispendown = false;

})

function getPosition() {
    let { top } = board.getBoundingClientRect();
    return top;
}