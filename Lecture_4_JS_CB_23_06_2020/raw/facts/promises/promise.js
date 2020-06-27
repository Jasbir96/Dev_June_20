let fs = require("fs");
console.log("Before");
let cPromise = fs.promises.readFile("f1.txt");
console.log(cPromise);
// listener 
let thekaPromise = cPromise.then(scb);

function scb(data) {
    console.log("Inside then");
    console.log(data);
    return 10;
}

console.log(thekaPromise);
thekaPromise.then(function (data) {
    console.log(data);
});
cPromise.catch(fcb);
function fcb(err) {
    console.log(err);
}
console.log("After");
// setTimeout(function () {
//     console.log(cPromise)
// }, 1000);