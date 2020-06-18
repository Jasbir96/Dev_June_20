// // primitive=> number,string,boolean,undefined,null
// // nonPrimitive => functions,arrays,objects 
// // key :value pair
// // JSON => data transfer format 
// // JS object notation
// let cap = {
//     "name": "Steve",
//     "lastName": "Rogers",
//     "movies": ["Civil War", "Last Avenger"],
//     "age": 45,
//     address: {
//         city: "NewYork",
//         state: "Manhatten"
//     },
//     sayHi: function () {
//         console.log("Cap Say's Hi");
//     }
// }
// // console.log(cap.age);
// // XML
// {/* <Name>Steve</Name>
// <lastName>Rogers</lastName> */}
// // implicit typecoersion
// // console.log(1 + "11");
// // console.log(+"11" + 1);
// // console.log(!"" + 1);

// // object => string 

// // let rval=[{"name":"steve"}]+"";
// // console.log(rval);
// // JSON.stringify;
// let emptyString = "";
// for (let key in cap) {
//     emptyString += `${key} : ${cap[key]}`;
// }
// console.log(emptyString);

let arr=["sdfcashnc",1,[1,2,3,4],{name:"steve"}];
console.log(arr);
console.log(arr.length);
