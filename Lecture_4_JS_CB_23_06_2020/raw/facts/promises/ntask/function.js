// function getFirstName(fullName) {
//     return fullName.split(" ")[0];
// }
// function getLastName(fullName) {
//     return fullName.split(" ")[1];
// }
// HOF => are the function that takes fn as an input
function greeter(fullName, fn) {
    let message = fn(fullName);
    console.log("Hi " + message);
}
// greeter("Jasbir Singh", getFirstName)
// greeter("Jasbir Singh", getLastName)

// assignment
// passed as a parameter
// could returned from function
// function outer() {
//     console.log("I am outer giving u inner fn");
//     function inner() {
//         console.log("i am inner");
//     }
//     return inner;
// }
// let rFn = outer();
// console.log(rFn);
// rFn();

// // closure
// function pc(base) {
//     console.log(base);
//     // inner function creates a closure over variables of outer function
//     function inner(exp) {
//         return Math.pow(base, exp);
//     }
//     return inner;
// }
// // runs first 
// let innerfn=pc(10);
// console.log(innerfn);

// let val=innerfn(2);
// console.log(val);

function getFirstName(firstName) {
    console.log(firstName);
    return function getLastName(lastName) {
        console.log(`${firstName} ${lastName}`);
    }
}
let rf = getFirstName("Steve");
console.log("Other work")
setTimeout(function () {
    rf("Rogers");
}, 2000);

// local
// global 
//closure 