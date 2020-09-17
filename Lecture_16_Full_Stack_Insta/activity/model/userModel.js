const connection = require("./connection");
const { v4: uuidv4 } = require('uuid');
const util = require("util");

// query
// create
let create = (userObj) => {
    // insert 
    userObj.id = uuidv4();
    // create user 
    return new Promise(function (resolve, reject) {
        connection.query("INSERT INTO user SET ?", userObj, function (err, res) {
            if (err) {
                reject(err)
                return;
            } else {
                resolve(res);
            }
        })
    })
}

// getby uid 
let getById = (uid) => {
    return new Promise(function (resolve, reject) {
        connection.query(`SELECT * from user WHERE uid="${uid}"`,
            function (err, res) {
                if (err) {
                    reject(err)
                    return;
                } else {
                    resolve(res[0]);
                }
            })
    })
}
// update
let update = (uid, toUpdateObject) => {
    // console.log(uid);
    let updateString = '';
    console.log(toUpdateObject);
    for (let attr in toUpdateObject) {
        console.log(toUpdateObject[attr]);
        updateString += `${attr}="${toUpdateObject[attr]}", `
    }
    console.log(updateString)
    updateString = updateString.substring(0,
        updateString.length - 2);
    return new Promise(function (resolve, reject) {
        connection.query(`UPDATE user SET 
        ${updateString} WHERE uid="${uid}"`,
            function (err, result) {
                if (err) {
                    reject(err)
                } else {
                    resolve(result);
                }
            });
    })
}
let deleteById =  (uid) => {
console.log(uid);
return new Promise(function (resolve, reject) {
    connection.query(`DELETE from user WHERE uid="${uid}"`,
        function (err, result) {
            if (err) {
                reject(err)
            } else {
                resolve(result);
            }
        });
})
     
}
// delete
// send request
// recieve request

module.exports.create = create;
module.exports.getById = getById;
module.exports.update = update;
module.exports.deleteById = deleteById;