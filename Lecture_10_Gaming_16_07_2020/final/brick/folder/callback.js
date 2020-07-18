function getFirstName(name) {
  return name.split(" ")[0];
}
function getLastName(name) {
  return name.split(" ")[1];
}
function greeter(name, fn) {
  var greet = fn(name);
  console.log("Hi " + greet);
}
greeter("Steve Rogers", getFirstName);
greeter("Steve Rogers", getLastName);

// var string = "Steve rogers son of odin";
// var sarr = string.split(" ");
// console.log(sarr[0]);
