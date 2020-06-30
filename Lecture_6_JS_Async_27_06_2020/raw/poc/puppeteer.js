// npm install puppeteer
// puppeteer=> require
let pp = require("puppeteer");
async function fn() {
    // headless browser
    let browser = await pp.launch({
        headless: false,
        defaultViewport: null,
        args: ["--start-maximized"],
        slowMo: 100
    });
    let { email, pwd } = require("../../../credentials");
    // let tab = await browser.newPage();
    let AllTabs = await browser.pages();
    let tab = AllTabs[0];
    await tab.goto("https://www.hackerrank.com/auth/login?h_l=body_middle_left_button&h_r=login")
    await tab.type("#input-1", email);
    await tab.type("#input-2", pwd);
    // click=> login
    // await tab.click();
    await Promise.all([
        tab.waitForNavigation({ waitUntil: "networkidle0" }),
        tab.click("button.auth-button"),
    ]);
    await tab.click('a[data-analytics="NavBarProfileDropDown"]');
    await
        Promise.all([
            tab.waitForNavigation({ waitUntil: "networkidle0" }),
            tab.click("a[data-analytics='NavBarProfileDropDownAdministration']")]);
    // Performs release event on target element
    // driver.findElements
    let liArr = await tab.$$("ul.nav-tabs li");
    await liArr[1].click();
    let createChallengePageLink = await tab.url();
    console.log(createChallengePageLink);
    // parallely tab open 
    // browser.newPage();
}
fn();