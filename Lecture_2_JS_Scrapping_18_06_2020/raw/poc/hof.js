function getFirstName(fullName) {
    return fullName.split(" ")[0];
}
function getLastName(fullName) {
    return fullName.split(" ")[1];
}
// hof => that accepts a function and calls it internally

function greeter(fullName, cb) {
    let message = cb(fullName);
    console.log("Hi " + message);
}

// let rVal = getFirstName("Jasbir Singh");
// rVal = getLastName("Jasbir Singh");
// console.log(rVal);

greeter("Jasbir Singh",getFirstName);

greeter("Jasbir Singh",getLastName);