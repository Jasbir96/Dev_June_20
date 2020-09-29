const connection = require("./connection");
const { v4: uuidv4 } = require('uuid');
const util = require("util");
const factory = require("./factoryModel");
// query
// create
// let create = (userObj) => {
//     // insert 
//     userObj.id = uuidv4();
//     // create user 
//     return new Promise(function (resolve, reject) {
//         connection.query(`INSERT INTO ${entity} SET ?`, userObj, function (err, res) {
//             if (err) {
//                 reject(err)
//                 return;
//             } else {
//                 resolve(res);
//             }
//         })
//     })
// }

let create = factory.createFactory("user");
// getby uid 
let getById = (uid) => {
    return new Promise(function (resolve, reject) {
        connection.query(`SELECT * from user WHERE id="${uid}"`,
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
    // console.log(toUpdateObject);
    for (let attr in toUpdateObject) {
        console.log(toUpdateObject[attr]);
        updateString += `${attr}="${toUpdateObject[attr]}", `
    }
    updateString = updateString.substring(0,
        updateString.length - 2);
        
        console.log("Line number"+updateString)
    return new Promise(function (resolve, reject) {
        connection.query(`UPDATE user SET ${updateString} WHERE id="${uid}"`,
            function (err, result) {
                if (err) {
                    // console.log(err);
                    reject(err)
                } else {
                    resolve(result);
                }
            });
    })
}
let deleteById = (uid) => {
    console.log(uid);
    return new Promise(function (resolve, reject) {
        connection.query(`DELETE from user WHERE id="${uid}"`,
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