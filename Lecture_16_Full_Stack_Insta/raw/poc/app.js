//  api making framework
const express = require("express");
let userDB = require("./db/user.json");
const fs = require("fs");
const path = require("path");
// const { response } = require("express");
const app = express();
// // for accepting data in req.body
app.use(express.json());

// get => some changing parameter 
// getOne
// npm i uuid
// npm i nodemon --save-dev
const { v4: uuidv4 } = require('uuid');
// get All userDB
app.get("/user", (req, res) => {
    // req paramatere -> user id
    // console.log(req.params);
    res.status(201).json({
        status: "success",
        userDB: userDB
    })
})
// get One
app.get("/user/:uid", (req, res) => {
    // req paramatere -> user id
    let cUid = req.params.uid;
    let userArr = userDB.filter((user) => {
        return user.uid == cUid;
    });
    console.log(req.params);
    res.status(201).json({
        status: "success",
        user: userArr.length == 0 ? "no user" : userArr[0]
    })
})
// create 
app.post("/user", (req, res) => {
    let user = req.body;
    console.log(user);
    user.uid = uuidv4();
    userDB.push(user);

    // saved to disk
    fs.writeFileSync(path.join(__dirname, "/db/user.json"), JSON.stringify(userDB));
    // res
    res.status(201).json({
        status: "success",
        user: req.body
    })
})
// // updated => key search 
app.patch("/user/:uid", (req, res) => {
    let user = getUserById(req.params.uid);
    let toBeUpdatedObj = req.body;
    // user , obj
    // user.something
    for (let key in toBeUpdatedObj) {
        console.log(key);
        user[key] = toBeUpdatedObj[key];
    }
    fs.writeFileSync(path.join(__dirname, "/db/user.json"), JSON.stringify(userDB));
    res.status(200).json({
        status: "success",
        user: user
    })
})
// delete => filter
app.delete("/user/:uid", (req, res) => {
    let cid = req.params.uid;
    console.log(userDB.length);
    userDB = userDB.filter((user) => { return user.uid != cid; })
    fs.writeFileSync(path.join(__dirname, "/db/user.json"), JSON.stringify(userDB));
    res.status(200).json({
        status: "success",
        userDB,
        length: userDB.length
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

app.listen(3000, () => {
    console.log("Server started at port 3000");
})
function getUserById(cUid) {


    let userArr = userDB.filter((user) => {
        return user.uid == cUid;
    });
    return userArr[0];
}