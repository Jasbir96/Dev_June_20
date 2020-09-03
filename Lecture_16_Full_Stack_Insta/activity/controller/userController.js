const userDB = require("../model/user.json");
const { v4: uuidv4 } = require('uuid');
const getAllUser = (req, res) => {
    // req paramatere -> user id
    // console.log(req.params);
    res.status(201).json({
        status: "success",
        userDB: userDB
    })
}
const updateUser = (req, res) => {
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

}
const deleteUser = (req, res) => {
    let cid = req.params.uid;
    console.log(userDB.length);
    userDB = userDB.filter((user) => { return user.uid != cid; })
    fs.writeFileSync(path.join(__dirname, "/db/user.json"), JSON.stringify(userDB));
    res.status(200).json({
        status: "success",
        userDB,
        length: userDB.length
    })
}
const getUser = (req, res) => {
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
    // next()
}
const createUser = (req, res) => {
    let user = req.body;
    // console.log(user);
    user.uid = uuidv4();
    userDB.push(user);
    // saved to disk
    fs.writeFileSync(path.join(__dirname, "/db/user.json"), JSON.stringify(userDB));
    // res
    // res.status(201).json({
    //     status: "success",
    //     user: req.body
    // })
}

module.exports.getAllUser = getAllUser;
module.exports.updateUser = updateUser;
module.exports.deleteUser = deleteUser;
module.exports.getUser = getUser;
module.exports.createUser = createUser;
