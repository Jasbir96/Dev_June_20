const express = require("express");
const app = express();
const passport = require("passport");
app.use(express.static("public"))
var GoogleStrategy = require('passport-google-oauth2').Strategy;
// passport fn => information of server to outh provider
// library
app.use(passport.initialize());
app.use(passport.session());
// passport .serialize
// passport .deserialize
passport.serializeUser(function (user, done) {
    done(null, user);
});
//  db me find
passport.deserializeUser(function (user, done) {
    done(null, user);
});
// server 
passport.use(new GoogleStrategy({
    clientID: CLIENT_ID,
    clientSecret: CLIENT_PASSWORD,
    callbackURL: "http://localhost:4000/auth/callback",
    passReqToCallback: true
},
    function (request, accessToken, refreshToken, profile, done) {
        console.log(profile);
        // user find => exist => login
        // signup => send to register page
        // data access
        done(null, profile);
    }
))
// from client  
app.get('/auth/google',
    passport.authenticate('google',
        { scope: ['email', 'profile'] }));
// from google server
app.get('/auth/callback',
    passport.authenticate('google', {
        successRedirect: '/auth/success',
        failureRedirect: '/auth/failure'
    })
);
app.get("/auth/success", function (req, res) {
    console.log("user authenticated");
    res.json({
        "message": "user authenticated"
    })
})
app.get("/auth/failure", function (req, res) {
    console.log("user not verfied");
})

app.listen(4000, console.log("Server is running at port 4000"));