
let files = ["../f1.txt", "../f2.txt", "../f3.txt", "../f4.txt"];
let fs = require("fs");
console.log("Before");
// fs.readFile
function fileReader(i) {
    if (i == files.length) {
        return;
    }
    // fn => goes to node api 
    fs.readFile(files[i], function (err, content) {
        console.log(`content ${content}`);
    })
    fileReader(i + 1);
}
fileReader(0);
console.log("After");