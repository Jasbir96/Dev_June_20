const connection = require("./connection")
const addFollowing = (obj) => {
    return new Promise(function (resolve, reject) {
        connection.query("INSERT into user_following SET ?", obj, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result)
            }
        })
    })
}
const getFollowing = (id) => {
    return new Promise(function (resolve, reject) {
        connection.query(`SELECT following_id from user_following WHERE u_id ="${id}"`, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result)
            }
        })
    })
}

module.exports.addFollowing = addFollowing;
module.exports.getFollowing = getFollowing;