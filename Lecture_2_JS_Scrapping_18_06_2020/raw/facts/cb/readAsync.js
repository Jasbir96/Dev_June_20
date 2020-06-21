let fs = require("fs");
console.log("Before");

// async function => cb function
// intiate the task 
// task => readfile
// 

fs.readFile("E:\\file1.mp4", function (err, content) {
    if(err){
        console.log("some error occurred")
    }else{

        console.log("content " + content.byteLength);
        console.log("Actual after");
    }
});
console.log("After");
while(true);

