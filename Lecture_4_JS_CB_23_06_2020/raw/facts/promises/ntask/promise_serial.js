let files = ["../f1.txt", "../f2.txt", "../f3.txt"];
let fs = require("fs");
let ffileReadPromise = fs.promises.readFile(files[0]);
for (let i = 1; i < files.length; i++) {
    ffileReadPromise = ffileReadPromise.then(function (data) {
        console.log("" + data);
        let nextFileReadPromise = fs.promises.readFile(files[i]);
        return nextFileReadPromise;
    })
}
ffileReadPromise.then(function (data) {
    console.log(data + "");
});