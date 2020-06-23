// promise creater
let fs = require("fs");
function promisifyFS(path) {
    let pPromise = new Promise(function (resolve, reject) {
        // resolve call
        // logic
        fs.readFile(path, function (err, data) {
            if (err) {
                reject(10)
            } else {
                resolve("cjadbscj")
            }
        });
        //reject call
    });
    return pPromise;
}
// let promise=fs.promises.readfile("f1.txt");
// consumer
// cb => cbhell
// object => then ,catch
// resolve => send result => then
// reject=> send error => catch 
let fpromise = promisifyFS("f1.txt");
console.log(fpromise);

fpromise.then(function (data) {
    console.log(" Data has arrived");
    console.log("Content : " + data);
});

fpromise.catch(function (err) {
    console.log("Inside catch");
    console.log(err);
});
