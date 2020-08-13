
let pencil = document.querySelector("#pencil");
let eraser = document.querySelector("#eraser");
let undo = document.querySelector("#undo");
let redo = document.querySelector("#redo");
let pencilOptions = document.querySelector("#pencil-options");
let eraserOptions = document.querySelector("#eraser-options");
// ctx.lineWidth=10;
let activeTool = "pencil";
pencil.addEventListener("click", function () {
    if (activeTool == "pencil") {
        //  pencil options show
        pencilOptions.classList.add("show");
    } else {
        activeTool = "pencil";
        eraserOptions.classList.remove("show");
        ctx.strokeStyle = "black";
    }
})
eraser.addEventListener("click", function () {
    if (activeTool == "eraser") {
        //  pencil options show
        eraserOptions.classList.add("show");
    } else {
        activeTool = "eraser";
        pencilOptions.classList.remove("show");
        ctx.strokeStyle = "white";
    }
})
undo.addEventListener("click", function () {
    undoMaker()
})
redo.addEventListener("click", function () {
    redoMaker();
})
document.addEventListener("keydown", function (e) {
    var evtobj = e;
    if (evtobj.keyCode == 90 && evtobj.ctrlKey)
        undoMaker();
})
document.addEventListener("keydown", function (e) {
    var evtobj = e;
    if (evtobj.keyCode == 89 && evtobj.ctrlKey)
        redoMaker();
})

function handleColor(color) {
    ctx.strokeStyle = color;
}
