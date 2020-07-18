var age = 15;
var Obj = {
  age: 105,
  firstName: "Steve",
  lastName: "Rogers",
  movies: ["Winter soldier", "Civil War", "First Avenger"],
  getAge: function() {
    console.log("My age is " + this.age);
  }
};
var hydra = Obj;
Obj = null;
this.getAge();
//Obj.getAge();

// Get
// console.log(Obj.firstName);
// Obj.getAge();
// // set
// Obj.firstName = "Hydra";
// Obj.friends = ["Thor", "Hulk", "Spider Man"];
// console.log(Obj.firstName);
// console.log(Obj.friends);
// //
// console.log(Obj.middleName);
