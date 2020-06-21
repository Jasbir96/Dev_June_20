const { fstat } = require("fs");

let files = ["../f1.txt", "../f2.txt", "../f3.txt", "../f4.txt"];
let fs = require("fs");
console.log("Before");
for (let i = 0; i < files.length; i++) {
    let content = fs.readFileSync(files[i]);
    console.log(`content ${content}`);
}
console.log("After");