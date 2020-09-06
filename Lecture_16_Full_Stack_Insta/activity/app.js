//  api making framework
const express = require("express");
const fs = require("fs");
const path = require("path");
// const { response } = require("express");
const userRouter = require("./router/userRoutes");
const app = express();
// // for accepting data in req.body
//  it will always run
// user defined
app.use(express.static("public"));
app.use(function before(req, res, next) {
    console.log("I will run before express.json");
    console.log(req.body);
    next();
})
// user defined middleware
// it tracks json obj in http body and add it to req.body
app.use(express.json());
// app.use(function checkBody(req, res, next) {
//     console.log("I will run after express.json");
//     let keysArray = Object.keys(req.body);
//     if (keysArray.length == 0) {
//         res.status(200).json({
//             "status": "failure",
//             "message": "Body Could not be empty"
//         })
//     } else {
//         next();
//     }
// })
// get => some changing parameter 
// getOne
// npm i uuid
// npm i nodemon --save-dev

// /api/v1/user/:uid=>userRouter 
// api/v1/post/:uid=> postRouter
// router created

// 
// localhost:3000/api/v1/users/:uid
app.use("/api/v1/user", userRouter);
// app.use("/api/v1/post", postRouter);
// 404 route 
app.use("*", (req, res) => {
    res.status(404).json({
        "status": "failure",
        "message": "resource not found"
    })
})
// userDB.splice(idx,1);
// get ,post ,patch ,delete => express methods
// 127.0.0.1:3000=> localhost:3000/home
// get All=> admin
// get=> particular a user
// post => create  a user 
// update => update a user
// delete a user
// name,password,handle,image_url,bio,uid,email
// https://www.flipkart.com/television-store/
// protocol// web.hostname.subdomain/route 
app.listen(3000, () => {
    console.log("Server started at port 3000");
})
function getUserById(cUid) {


    let userArr = userDB.filter((user) => {
        return user.uid == cUid;
    });
    return userArr[0];
}