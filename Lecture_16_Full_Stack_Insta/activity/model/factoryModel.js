const connection = require("./connection");
const { v4: uuidv4 } = require('uuid');
module.exports.createFactory = function (entity) {
    return  (entityObj) => {
            // insert 
            entityObj.id = uuidv4();
            // create user 
            return new Promise(function (resolve, reject) {
                connection.query(`INSERT INTO ${entity} SET ?`, entityObj, function (err, res) {
                    if (err) {
                        reject(err)
                        return;
                    } else {
                        resolve(res);
                    }
                })
            })
        }
    }
    