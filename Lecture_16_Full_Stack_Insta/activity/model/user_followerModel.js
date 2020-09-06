const connection = require("./connection");
const { v4: uuidv4 } = require('uuid');
const util = require("util");
const addPendingFollower = (obj) => {
    return new Promise(function (resolve, reject) {
        connection.query("INSERT into user_follower SET ?", obj, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result)
            }
        })
    })
}
const getAllFollowers = (uid) => {
    return new Promise(function (resolve, reject) {
        connection.query(`SELECT * from user_follower WHERE user_id="${uid}"`, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result)
            }
        })
    })
}
const acceptRequest = (user_id, follower_id) => {
    return new Promise(function (resolve, reject) {
        connection.query(`UPDATE user_follower SET is_accepted=true WHERE user_id="${user_id}" AND 
        follower_id="${follower_id}"`, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result)
            }
        })
    })
}
module.exports.addPendingFollower = addPendingFollower;
module.exports.getAllFollowers = getAllFollowers;
module.exports.acceptRequest = acceptRequest;