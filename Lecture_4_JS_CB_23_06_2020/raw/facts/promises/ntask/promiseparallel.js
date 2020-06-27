let files = ["../f1.txt", "../f2.txt", "../f3.txt"];
let fs = require("fs");
for (let i = 0; i < files.length; i++) {
    let fpReadpromise = fs.promises.readFile(files[i]);
    fpReadpromise.then(function (data) {
        console.log(data + "");
    })

}