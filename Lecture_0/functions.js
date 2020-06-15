
function sayHi(message) {
    console.log("I want to say " + message);
}
// function call
// let rVal = sayHi("Something interesting");
// console.log(rVal);
// function name 
console.log(sayHi);
// functions are first class citizens=>// functions are variables
let a = 10;
b = a;
console.log(b);
let greeter = function stat() {
    console.log("functions are variables");
}
// greeter(10);

