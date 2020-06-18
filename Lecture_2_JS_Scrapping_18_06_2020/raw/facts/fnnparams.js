// function are variable 
// pass a variable as a parameter to a function
// pass a function as a parameter to function
function myfun(param) {
    // console.log(param);
    let rVal = param();
    console.log(rVal);
}
// myfun(10);
// myfun("adsjfmhbsdamjh");
// myfun(true);
// myfun([1, 2, 3, 4, 5, 6]);
// smaller is a callback function => a function that is passed to another function and could be called by it 
myfun(function smallerfn() {
    let a = 10;
    a++;
    console.log("I am function passed to myfun");
    return a;
});