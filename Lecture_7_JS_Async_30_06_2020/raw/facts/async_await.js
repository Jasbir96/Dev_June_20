let fs = require("fs");
// catch suppresses the error 
// fsP.then(function (data) {
//     console.log(data);
// })
// syntax sugar
console.log("Before");
async function fn() {
    console.log("Inside fn");
    let fsP = fs.promises.readFile("f1.txt");
    let data = await fsP;
    console.log("After await");
    console.log("" + data);
    // console.log(data + " ");
    // console.log(dArr[0] + " ");
    // console.log(dArr[1] + " ");
}

async function fn2() {
    console.log("Inside f2");
    let sfp = fs.promises.readFile("f2.txt");
    let data = await sfp;
    console.log("after await");
    console.log("" + data);
}
 fn();
console.log("`````````````````````");
fn2();
console.log("`````````````````````");
console.log("After");
