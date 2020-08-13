
let pencil = document.querySelector("#pencil");
let eraser = document.querySelector("#eraser");
// ctx.lineWidth=10;
pencil.addEventListener("click", function () {
    ctx.strokeStyle = "black";
})
eraser.addEventListener("click", function () {
    ctx.strokeStyle = "white";
})