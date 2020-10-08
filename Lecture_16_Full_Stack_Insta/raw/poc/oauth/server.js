const express = require("express");
const app = express();
const mysql = require('mysql');
const { v4: uuidv4 } = require("uuid");
const cookie = require("cookie-session");
// ****DataBase connection**********************
// to handle cookies in express
const passport = require("passport");

app.use(cookie({
    maxAge: 60 * 24 * 60 * 1000,
    keys: ["jdsfbdjhsfbd"]
}))

app.use(passport.initialize());
app.use(passport.session());

const DB = mysql.createConnection({
    host: 'localhost',
    user: "root",
    password: "password",
    database: "insta"
});
DB.connect();
// *********************************************

app.use(express.static("public"));
// passport .serialize
// passport .deserialize
// it will be used to send the cookie
passport.serializeUser((user, done) => {
    done(null, user.id);
})
passport.deserializeUser((id, done) => {
    DB.query(`SELECT * from user WHERE id="${id}"`, function (err, res) {
        let user = {};
        if (res.length == 0) {
            done(err);
        } else {
            user = res[0]
            done(null, user);
        }
    })
})
var GoogleStrategy = require('passport-google-oauth2').Strategy;
// server 
passport.use(new GoogleStrategy({
    clientID: "1005856491721-qbe2ih5cm0jhkjnno19vh4cp0a03d0nl.apps.googleusercontent.com",
    clientSecret: "VtvY353cz3ICiedckpXk6q9b",
    callbackURL: "http://localhost:4000/auth/callback",
    passReqToCallback: true
},
    function (request, accessToken, refreshToken, profile, done) {
        // console.log(profile);
        // console.log(profile.id);
        let { email, id } = profile
        // profile.email
        // profile.photos[0].value
        // name: profile.name.givenName
        DB.query(`SELECT * from user WHERE gmail_id="${id}"`, function (err, res) {
            let user = {};
            // signup
            if (res.length == 0) {
                user.name = profile.name.givenName;
                user.email = email;
                user.pimg_url = profile.photos[0].value;
                user.id = uuidv4();
                user.gmail_id = id;
                DB.query(`INSERT INTO user SET ?`, user, function (err, res) {
                    console.log("Here");
                    if (err) {
                        done(err);
                    } else {
                        done(null, user);
                    }
                })

            } else {
                user = res[0]
                done(null, user);
            }

        })
    }
    // when you recive user info
))
app.get("/", (req, res) => {
    res.send("Hello from server");
})
// client request 
app.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }));
// from google server
app.get('/auth/callback', passport.authenticate("google"), function (req, res) {
    console.log(req.user);
    console.log("data recieved from server")
    console.log("user authenticated");
    res.send(
        {
            status: "success",
            user: req.user
        }
    );
});

function authChecker(req, res, next) {
    if (req.user) {
        console.log("let him go");
        next();
    } else {
        res.redirect("/auth/google");
    }
}
app.get("/profile", authChecker, function (req, res) {

    res.send(`<p> Accessed profile Page</p>${JSON.stringify(req.user)}</p>`)

})
app.listen(4000, console.log("Server is running at port 4000"));



// user find => exist => login
// signup => send to register page
// data access
// done(null, user);
// from client 












// console.log("connected to DB");
// module.exports = connection;
// function (request, accessToken, refreshToken, profile, done) {
//     // console.log(profile);
//     // console.log(profile.id);
//     let { email, id } = profile
//     // profile.email
//     // profile.photos[0].value
//     // name: profile.name.givenName
//     DB.query(`SELECT * from user WHERE gmail_id="${id}"`, function (err, res) {
//         let user = {};
//         if (res.length == 0) {
//             user.name = profile.name.givenName;
//             user.email = email;
//             user.pimg_url = profile.photos[0].value;
//             user.id = uuidv4();
//             user.gmail_id = id;
//             DB.query(`INSERT INTO user SET ?`, user, function (err, res) {
//                 console.log("Here");
//                 if (err) {
//                     // done(err);
//                 } else {
//                     // done(null, user);
//                 }
//             })

//         } else {
//             user = res[0]
//             // done(null, user);
//         }

//     })
// }