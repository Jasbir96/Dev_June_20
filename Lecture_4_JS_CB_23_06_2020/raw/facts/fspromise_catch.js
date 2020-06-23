let fs = require("fs");
let fsP = fs.promises.readFile("f1.txt");
// catch suppresses the error 
fsP.then(function (data) {
    console.log("" + data);
    return fs.promises.readFile("f11.txt");
}).then(function () {
    console.log("Inside second then");
}).catch(function () {
        console.log("Inside catch");
        return fs.promises.readFile("f1.txt");
    }).then(function () {
        console.log("Inside third then");
    })
    .then(function () {
        console.log("Inside fourth then");
    })