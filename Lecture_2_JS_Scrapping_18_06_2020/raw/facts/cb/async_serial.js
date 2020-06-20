let fs = require("fs");
console.log("Before");
// serial
// nesting of cb => cb hell
fs.readFile("f1.txt", function (err, data) {
    console.log("Data of f1");
    console.log("content " + data)
    fs.readFile("f2.txt", function (err, data) {
        console.log("Data of f2");
        console.log("content " + data)
        fs.readFile("f3.txt", function (err, data) {
            console.log("Data of f3");
            console.log("content " + data)
        })
    })
});


console.log("After");