// const userDB = require("../model/user.json");
const userModel = require("../model/userModel");
const userFollowerModel = require("../model/user_followerModel");
const userFollowingModel = require("../model/user_followingModel");
const postModel = require("../model/postModel");

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
    // img upload server=> data
    // file
    console.log(req.file);
    // text
    console.log(req.body);
    if (req.file) {
        toBeUpdatedObj.pimg_url = "user/" + req.file.filename;
    }

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
const deleteUser = async (req, res) => {
    let cid = req.params.uid;
    try {
        let result = await userModel.deleteById(cid);
        console.log(result);
        res.status(200).json({
            status: "success",
            result: result
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: "failure",
            "message": err.message,

        })
    }

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
// ***********************************request*******************************
// send Request 
const createRequest = async (req, res) => {
    try {
        let uid = req.body.user_id;
        let follower_id = req.body.follower_id;
        await userFollowerModel.addPendingFollower(req.body);
        let { is_public } = await userModel.getById(uid);
        if (is_public == true) {
            await userFollowerModel.acceptRequest(uid, follower_id);
            await userFollowingModel.addFollowing({ u_id: follower_id, following_id: uid });
            return res.status(201).json({
                status: "success",
                "message": "request accepted"
            })
        }
        res.status(201).json({
            status: "pending",
            "message": "request is send user will accept it"
        })


    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: "success",
            "message": err.message
        })
    }
}
const acceptRequestHandler = async (req, res) => {
    try {
        let uid = req.body.user_id;
        let follower_id = req.body.follower_id;
        await userFollowerModel.acceptRequest(uid, follower_id);
        await userFollowingModel.addFollowing({ u_id: follower_id, following_id: uid });
        return res.status(201).json({
            status: "success",
            "message": "request accepted"
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: "success",
            "message": err.message
        })
    }
}
// get ALL followers
const getAllFollowers = async (req, res) => {
    try {
        let result = await userFollowerModel.getAllFollowers(req.params.id);
        res.status(201).json({
            status: "success",
            "message": result
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: "success",
            "message": err.message
        })
    }

}
const getCountOfAllFollowers = async (req, res) => {
    try {
        let result = await userFollowerModel.getCountFollowers(req.params.id);
        res.status(201).json({
            status: "success",
            "message": result
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: "success",
            "message": err.message
        })
    }

}
// get All post of a user
const getMyPost = async (req, res) => {
    let id = req.params.id;

    try {
        let allPost = await postModel
            .getAllPostOfAUser(id);
        res.status(200).json({
            status: "success",
            "message": allPost
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: "success",
            "message": err.message
        })
    }
}
const getMyFeed = async (req, res) => {
    let id = req.params.id;
    try {
        // get all friends that you follow
        let friendsId = await userFollowingModel.getFollowing(id);

        // get allPost 
        let feed = [];

        friendsId = friendsId.map((friendsId) => {
            return friendsId.following_id;
        })
        // console.log(friendsId)
        // for (let friendId in friendsId) {
        //     console.log(friendId);
        //     let fAllPost = await postModel
        //         .getAllPostOfAUser(friendsId[friendsId]);
        //         // console.log(fAllPost)
        //     feed = [...feed, ...fAllPost];
        // }
        for (let i = 0; i < friendsId.length; i++) {
                let fAllPost = await postModel
                    .getAllPostOfAUser(friendsId[i]);
                    // console.log(fAllPost)
                feed = [...feed, ...fAllPost];
        }
        res.status(200).json({
            status: "success",
            "message": feed
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: "success",
            "message": err.message
        })
    }
}

module.exports.getAllUser = getAllUser;
module.exports.updateUser = updateUser;
module.exports.deleteUser = deleteUser;
module.exports.getUser = getUser;
module.exports.createUser = createUser;
module.exports.checkBody = checkBody;
module.exports.createRequest = createRequest;
module.exports.getAllFollowers = getAllFollowers;
module.exports.getCountOfAllFollowers = getCountOfAllFollowers;
module.exports.acceptRequestHandler = acceptRequestHandler;
module.exports.getMyPost = getMyPost;
module.exports.getMyFeed = getMyFeed;
