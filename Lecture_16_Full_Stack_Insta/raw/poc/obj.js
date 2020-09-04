let keyString = "";
let valString = "";
let userObj = {
    uid  :"hgvhgnv",
    name :"Jasbir",
    phone :1234567890,
    email :abc@,
    handle VARCHAR(30) NOT NULL UNIQUE,
    bio VARCHAR(150),
    is_verified Boolean DEFAULT false,
    is_public Boolean DEFAULT true
}

for (let key in userObj) {

}

var sql = `INSERT INTO user (${keys}) VALUES (${value})`;