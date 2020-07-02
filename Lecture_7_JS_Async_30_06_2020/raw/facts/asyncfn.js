// promise => sugar syntax
async function fn() {

    console.log("I am async");
    // return promise;
    return 10
}
let rVal=fn();
console.log(rVal)
fn().then(function (data) {
console.log(data)
})