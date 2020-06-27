let fs = require("fs");
// catch suppresses the error 
// fsP.then(function (data) {
//     console.log(data);
// })
async function fn() {
    let fsP = fs.promises.readFile("f1.txt");
    let sfp = fs.promises.readFile("f2.txt");
    let dArr = await Promise.all([fsP, sfp]);
    // console.log(data + " ");
    console.log(dArr[0] + " ");
    console.log(dArr[1] + " ");
}
fn();