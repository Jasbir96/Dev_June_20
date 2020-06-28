// npm install selenium-webdriver
//npm install chromedriver
require("chromedriver");
let swd = require("selenium-webdriver");
// build browser
let bldr = new swd.Builder();
// build a tab
let driver = bldr.forBrowser("chrome").build();
// pending 

let { email, pwd } = require("../../credentials");
async function fn() {
    try {
        let GWillBeOpendP = driver.get("https://www.hackerrank.com/auth/login?h_l=body_middle_left_button&h_r=login");
        await GWillBeOpendP;
        let addImpWaitP = driver.manage().setTimeouts({ implicit: 10000,pageLoad:10000 });
        await addImpWaitP;
        let emailPromise = driver.findElement(swd.By.css("#input-1"));
        let passwordPromise = driver.findElement(swd.By.css("#input-2"));
        // parallely run promises
        let bothElemP = Promise.all([emailPromise, passwordPromise]);
        let beArr = await bothElemP;
        let EWillBeEP = beArr[0].sendKeys(email);
        let passwordEnteredP = beArr[1].sendKeys(pwd);
        let bothKeysWillBeEnteredP = Promise.all([EWillBeEP, passwordEnteredP]);
        await bothKeysWillBeEnteredP;
        await navigatorfn("button.auth-button");
        let adminBtn = await driver.findElement(swd.By.css('a[data-analytics="NavBarProfileDropDown"]'));
        let actions = driver.actions({ async: true });
        await actions.move({ origin: adminBtn }).click().perform();
        await navigatorfn("a[data-analytics='NavBarProfileDropDownAdministration']");
        // Performs release event on target element
        let liArr = await driver.findElements(swd.By.css("ul.nav-tabs li"));
        await liArr[1].click();
        let createChBtn = await driver.findElement(swd.By.css(".btn.btn-green.backbone.pull-right"));
        await createChBtn.click();
    } catch (err) {
        console.log(err);
    }
}
fn();

async function navigatorfn(selector) {
    // logic
    try {
        let elemP = driver.findElement(swd.By.css(selector));
        let elem = await elemP;
        let clickP = elem.click();
        await clickP;
    } catch (err) {
        console.log(err);
        return Promise.reject(err);
    }
}