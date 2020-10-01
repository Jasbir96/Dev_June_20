const factory = require("./factoryModel");
let create = factory.createFactory("post");
let connection = require("./connection");
let getAllPostOfAUser = (id) => {
    return new Promise(function (resolve, reject) {
        connection
    .query(`SELECT * from post WHERE author_id="${id}" ORDER BY DATE(created_at) DESC
    , created_at ASC`, function (err, res) {
                if (err) {
                    reject(err)
                    return;
                } else {
                    resolve(res);
                }
            })
    })
}
module.exports.getAllPostOfAUser = getAllPostOfAUser;
module.exports.create = create;