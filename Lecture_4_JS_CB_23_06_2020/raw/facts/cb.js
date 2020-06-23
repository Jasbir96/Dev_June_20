let fs = require("fs");
fs.readFile("f1.txt", function (err, data) {
    if (err) {
        console.log(err);
    } else {
        console.log(" Data has arrived");
        console.log("Content : " + data);

    }
})