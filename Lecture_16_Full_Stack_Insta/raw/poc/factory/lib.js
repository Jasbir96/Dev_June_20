//  firstly the whole file which is required is executed
// console.log("Hello from lib");

//  node obj that is exported to the file which requires 
// current file
// let entity="fake ";
module.exports.fn = function createFactory(entity) {
    console.log("inside entity ");
    console.log("Returning create " + entity + " fn  ");
    return function create(entityObj) {
        console.log("Inside create entity ");
        console.log("Created " + entity + " using " + JSON.stringify(entityObj));
    }
}
// console.log("Line no 7 in lib");
// // console.log(module.exports);
// // module.exports.fn();
module.exports.val = 4;
console.log("`````````````````````");
