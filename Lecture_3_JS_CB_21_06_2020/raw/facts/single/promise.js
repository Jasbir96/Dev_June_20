let fs = require("fs");
console.log("Before");
// you Don't need to pass any cb
// promise based functions create a promise => returns you promise
let fileWillReadPromise = fs.promises.readFile("f1.txt");
// start => pending 
// console.log(fileWillReadPromise);
// call a function after delay

//  when promise resolves to a value
fileWillReadPromise.then(function (data) {
    console.log("Inside then")
    console.log(data);
})
// // when promise rejects to an error
fileWillReadPromise.catch(function (err) {
    console.log("Inside catch block");
    console.log(err);
})

// setTimeout(function () {
//     console.log(fileWillReadPromise);
// }, 2000);

console.log("After");