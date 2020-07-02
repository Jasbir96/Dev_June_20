// build a tab

let pp = require("puppeteer");
// pending 
// let challenges = require("./challenges");
// let { email, pwd } = require("../../credentials");
let browser = pp.launch({
    headless: false,
    defaultViewport: null,
    args: ["--start-maximized"],
    slowMo: 100
});