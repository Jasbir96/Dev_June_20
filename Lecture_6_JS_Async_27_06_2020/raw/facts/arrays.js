let arr = [2, 4, 5, 7];
function cb(x) {
    return x * x;
}
// array => tranform
let narr = arr.map(cb);
console.log(narr);