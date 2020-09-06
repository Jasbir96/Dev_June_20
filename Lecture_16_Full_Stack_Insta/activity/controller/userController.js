const userDB = require("../model/user.json");
const userModel = require("../model/userModel");


const getAllUser = (req, res) => {
    // req paramatere -> user id
    // console.log(req.params);
    res.status(201).json({
        status: "success",
        userDB: userDB
    })
}
const updateUser = async (req, res) => {
    // let user = getUserById(req.params.uid);
    let uid = req.params.uid;
    let toBeUpdatedObj = req.body;
    try {
        let result = await userModel.update(uid, toBeUpdatedObj);
        res.status(200).json({
            status: "success",
            "message": result
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: "failure",
            "message": err.message,
            
        })
    }
    // // user , obj
    // // user.something
    // for (let key in toBeUpdatedObj) {
    //     console.log(key);
    //     user[key] = toBeUpdatedObj[key];
    // }
    // fs.writeFileSync(path.join(__dirname, "/db/user.json"), JSON.stringify(userDB));


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
const getUser = async (req, res) => {
    // req paramatere -> user id
    let cUid = req.params.uid;
    try {
        let user = await userModel.getById(cUid);
        res.status(201).json({
            status: "success",
            user: user
        });
    } catch (err) {
        res.status(201).json({
            status: "failure",
            user: err.message
        })
    }

    // next()
}
const createUser = async (req, res) => {
    let user = req.body;
    // console.log(user);
    try {
        let nDBUser = await userModel.create(user);
        // res
        res.status(201).json({
            status: "success",
            user: nDBUser
        })
    } catch (err) {
        res.status(500).json({
            status: "success",
            "message": err.message
        })
    }
}
const checkBody = function (req, res, next) {
    console.log("I will run after express.json");
    let keysArray = Object.keys(req.body);
    if (keysArray.length == 0) {
        res.status(200).json({
            "status": "failure",
            "message": "Body Could not be empty"
        })
    } else {
        next();
    }
}
module.exports.getAllUser = getAllUser;
module.exports.updateUser = updateUser;
module.exports.deleteUser = deleteUser;
module.exports.getUser = getUser;
module.exports.createUser = createUser;
module.exports.checkBody = checkBody;
