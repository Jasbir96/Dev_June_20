//  api making framework
const express = require("express");
const users = require("./db/user.json");
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');
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
// create 
app.post("/user", (req, res) => {
    let user = req.body;
    console.log(user);
    user.uid = uuidv4();
    users.push(user);

    // saved to disk
    fs.writeFileSync("./db/user.json", JSON.stringify(users));
    // res
    res.status(201).json({
        status: "success",
        user: req.body
    })
})
// get => some changing parameter 
app.get("/user/:uid", (req, res) => {
    // req paramatere -> user id
    let cUid = req.params.uid;
    let userArr = users.filter((user) => {
        return user.uid == cUid;
    });
    console.log(req.params);
    res.status(201).json({
        status: "success",
        user: userArr.length == 0 ? "no user" : userArr[0]
    })
})

// delete => filter
// updated => key search 
// users.splice(idx,1);

app.listen(3000, () => {
    console.log("Server started at port 3000");
})