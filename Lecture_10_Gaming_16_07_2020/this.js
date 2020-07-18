// // Methods
let another = {
    name: "Steve"
}
let obj = {
    name: "Jasbir",
    fn: function whoseThis(ref) {
        console.log(ref);
        function inner() {
            console.log(this);
        }
        inner();
    }
}
// functions
function myfn() {
    console.log(this.name);
}
// this is defined on  runtime
// fn call => this global object 
// myfn(this);
// let bFn = myfn.bind(another);
// bFn();
// bFn = myfn.bind(obj);
// bFn();

// object /Method call=> this is the object that calls that fn
obj.fn();
// console.log(global);
// this => according to my constraints


