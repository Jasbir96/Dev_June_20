// Non-primitive=> array,fn,object=> all are objects
// fn are special object that has code that could called
function myfn() {
    console.log("I am fn");
}
myfn();
myfn.myproperty = 10;

myfn.mymethod = function () {
    console.log("Hello from method of myfn");
}
console.log(myfn.myproperty)