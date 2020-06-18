function toBeExported(param) {
    console.log("I will be used by client");
    console.log(param);
}
function privatefunction() {
    console.log("I don't want to be exported");
}
let val = 20;
module.exports = {
    fn1: toBeExported,
    fn2: privatefunction,
    val: val
}