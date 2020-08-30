//  api making framework
const express = require("express");
const users = require("./db/user.json");
const fs = require("fs");
// const { response } = require("express");
const app = express();
// get ,post ,patch ,delete => express methods
// 127.0.0.1:3000=> localhost:3000/home
// get All=> admin
// get=> particular a user
// post => create  a user 
// update => update a user
// delete a user
// name,password,handle,image_url,bio,uid,email
// for accepting data in req.body
app.use(express.json());
app.post("/user", function (req, res) {
    let user = req.body;
    console.log(user);
    users.push(user);
    // saved to disk
    fs.writeFileSync("./db/user.json", JSON.stringify(users));
    // res
    res.status(201).json({
        status: "success",
        user: req.body
    })
})
app.listen(3000, () => {
    console.log("Server started at port 3000");
})