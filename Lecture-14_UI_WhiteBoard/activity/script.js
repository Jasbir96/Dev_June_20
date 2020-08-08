
let ispendown = false;
;
board.addEventListener("mousedown", function (e) {
    // path start
    let x = e.clientX;
    let y = e.clientY;
   let top= getPosition();
   y = y - top;
    //  move to
    ctx.beginPath(0, 0);
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
window.addEventListener("mouseup", function (e) {
    // mouse up
    // ctx.closePath();
    ispendown = false;

})
function getPosition() {
    let { top } = board.getBoundingClientRect();
    return top;
}