const connection=require("./connection")
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

module.exports.addFollowing = addFollowing;