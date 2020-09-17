let expObj = require("./lib");
// console.log(expObj.val);
// expObj.fn();
// console.log(expObj);
let rVal = expObj.fn("user");
rVal({ name: "Jasbir" });
//  create create Post fn 
let rVal=expObj.fn("post");
//  create Post fn call when req is recieved
rVal({
    author:"Jasbir",
    "descp":"hello from me "
})
