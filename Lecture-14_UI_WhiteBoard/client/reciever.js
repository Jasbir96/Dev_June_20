socket.on("colorchange", function (color) {
    ctx.strokeStyle = color;
});

socket.on("onmd", function (point) {
    console.log(point);
    let { color, width, x, y } = point;
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(x, y);
})
socket.on("onmm", function (point) {
    let { color, width, x, y } = point;
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.lineTo(x, y);
    ctx.stroke();
})