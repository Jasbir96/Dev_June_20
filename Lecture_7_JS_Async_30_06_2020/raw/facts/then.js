let fs = require("fs");
let frp = fs.promises.readFile("f11.txt");
function scb(data) {
    console.log("Inside ")
    console.log("" + data);
}
function fcb(err) {
    console.log("inside fcb")
    console.log(err);
    return 10;
}
frp.then(scb, fcb)
    .then(function (data) {
        console.log(data)
    }, function (err) {
        console.log("inside  second then fcb")
        console.log(err)
    });
