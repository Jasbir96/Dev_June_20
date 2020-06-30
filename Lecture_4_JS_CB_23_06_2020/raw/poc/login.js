// npm install selenium-webdriver
//npm install chromedriver
require("chromedriver");
let swd = require("selenium-webdriver");
// build browser
let bldr = new swd.Builder();
// build a tab
let driver = bldr.forBrowser("chrome").build();
// pending 
let GWillBeOpendP = driver.get("https://www.hackerrank.com/auth/login?h_l=body_middle_left_button&h_r=login");
let gCodeArr, gInputBox, gCodeBox;
// GWillBeOpendP.then(function () {
//     // console.log("Home page opened");
//     let emailPromise = driver.findElement(swd.By.css("#input-1"));

//     emailPromise.then(function (emailElement) {
//         let EWillBeEP = emailElement.sendKeys("hsdfvamsdjhf");

//         EWillBeEP.then(function () {
//             console.log("Data entered");
//         })
//     })
// })
let { email, pwd } = require("../../../credentials");
GWillBeOpendP.then(function () {
    let addImpWaitP = driver.manage().setTimeouts({ implicit: 10000 });
    return addImpWaitP;
}).then(function () {
    // console.log("Home page opened");
    let emailPromise = driver.findElement(swd.By.css("#input-1"));
    let passwordPromise = driver.findElement(swd.By.css("#input-2"));
    // parallely run promises
    let bothElemP = Promise.all([emailPromise, passwordPromise]);
    return bothElemP;
}).then(function (beArr) {
    let EWillBeEP = beArr[0].sendKeys(email);
    let passwordEnteredP = beArr[1].sendKeys(pwd);
    let bothKeysWillBeEnteredP = Promise.all([EWillBeEP, passwordEnteredP]);
    return bothKeysWillBeEnteredP;
}).then(function () {
    // email and pass entered
    // create a user defined promise based fn
    let loginWillClickedP = navigatorfn("button.auth-button");
    return loginWillClickedP;
}).then(function () {
    let ipBtnP = navigatorfn("#base-card-1-link");
    return ipBtnP;
})
    .then(function () {
        let arrayBtnP = navigatorfn("a[data-attr1='warmup']");
        return arrayBtnP;
    }).then(function () {
        // console.log("Reached questions page")
        // find all elements
        let allQsP = driver.findElements(swd.By.css(".js-track-click.challenge-list-item"));
        // parallely get href of all the anchors
        return allQsP;
    }).then(function (allQs) {
        let hrefpArr = [];
        // let hrefP = allQs[0].getAttribute("href");
        for (let i = 0; i < allQs.length; i++) {
            let hrefp = allQs[i].getAttribute("href");
            hrefpArr.push(hrefp);
        }
        // parallely solve ,order maintain
        let allHrefPArr = Promise.all(hrefpArr);
        return allHrefPArr;
    }).then(function (hrefArr) {
        let firstQWillBeSubmitP = questionSubmitter(hrefArr[0]);
        for (let i = 1; i < hrefArr.length; i++) {
            firstQWillBeSubmitP = firstQWillBeSubmitP.then(function () {
                let qsp = questionSubmitter(hrefArr[i]);
                return qsp;
            })
        }

        return firstQWillBeSubmitP;
    }).then(function () {
        console.log("All question submitted");
    })
    .catch(function (err) {
        console.log(err)
    })
// promise=> resolve => find,click
function navigatorfn(selector) {
    let pPromise = new Promise(function (resolve, reject) {
        // logic
        let elemP = driver.findElement(swd.By.css(selector));
        elemP
            .then(function (elem) {
                let clickP = elem.click();
                return clickP;
            }).then(function () {
                resolve();
            }).catch(function (err) {
                console.log(err);
                reject(err);
            })
    });
    return pPromise;
}
function questionSubmitter(qlink) {
    return new Promise(function (resolve, reject) {
        let qpP = driver.get(qlink);
        qpP.then(function () {
            let editorialWillBECLickedP = navigatorfn(
                "a[data-attr2='Editorial']");
            return editorialWillBECLickedP;
        }).then(function () {
            let handleLockP = handleLockBtn();
            return handleLockP;
        }).then(function () {
            // code find
            let codep = getCode();
            return codep;
            // copy 
            // code paste
        }).then(function (code) {
            // console.log(code);
            let codePasteP = pasteCode(code);
            return codePasteP;
        })
            .then(function () {
                console.log("code copied");
                resolve();
            }).catch(function (err) {
                reject(err);
            })
    });
}

function handleLockBtn() {
    // exist => click
    return new Promise(function (resolve, reject) {
        let lockBtnP = driver.findElement(swd.By.css("button.ui-btn.ui-btn-normal.ui-btn-primary .ui-content.align-icon-right"));
        lockBtnP.then(function (lockBtn) {
            let actions = driver.actions({ async: true });
            let elemPressedP = actions.move({ origin: lockBtn }).click().perform();
            // Performs release event on target element
            return elemPressedP
        }, function () {
            console.log("Lock Btn not found");
        }).then(function () {
            resolve();
        })
    })
    // move on
}
function getCode() {
    return new Promise(function (resolve, reject) {
        let h3P = driver.findElements(swd.By.css(".hackdown-content h3"));
        let highlightsP = driver.findElements(swd.By.css(".hackdown-content .highlight"));
        let bArrP = Promise.all([h3P, highlightsP]);
        bArrP
            .then(
                function (bArr) {
                    let h3Arr = bArr[0];
                    let highlightsCodeArr = bArr[1];
                    gCodeArr = highlightsCodeArr;
                    let tPArr = [];

                    for (let i = 0; i < h3Arr.length; i++) {
                        let textP = h3Arr[i].getText();
                        tPArr.push(textP);
                    }
                    let alltEextPArr = Promise.all(tPArr);
                    return alltEextPArr
                }).then(
                    function (allLangArr) {
                        console.log(allLangArr);
                        let index = allLangArr.indexOf("C++");
                        let codePromise = gCodeArr[index].getText();
                        return codePromise;
                        // filter out -> C++
                    }).then(function (code) {
                        resolve(code);
                    }).catch(function (err) {
                        reject(err);
                    })
    })
}

function pasteCode(code) {
    return new Promise(function (resolve, reject) {
        // click on problem tab
        let goToProblemTabP = navigatorfn('a[data-attr2="Problem"]');
        goToProblemTabP.then(function () {
            let inputWillBeClickedP = navigatorfn(".custom-input-checkbox");
            return inputWillBeClickedP;
        }).then(function () {
            let inputBoxP = driver.findElement(swd.By.css(".custominput"));
            return inputBoxP;
        }).then(function (inputBox) {
            gInputBox = inputBox;
            let codewillBeSendP = inputBox.sendKeys(code);
            return codewillBeSendP;
        }).then(function () {
            // ctrl  A
            let ctrlAWillBePressedP =
                gInputBox.sendKeys(swd.Key.CONTROL + "a");
            return ctrlAWillBePressedP;
        }).then(function () {
            // ctrlx
            let ctrlXWillBePressedP =
                gInputBox.sendKeys(swd.Key.CONTROL + "x");
            return ctrlXWillBePressedP;
        }).then(function () {
            let codeBoxP =
                driver.findElement(swd.By.css(".inputarea"));
            return codeBoxP
        }).then(function (codeBox) {
            gCodeBox = codeBox;
            let ctrlAp = codeBox.sendKeys(swd.Key.CONTROL + "a");
            return ctrlAp;
        }).then(function () {
            let ctrlVP = gCodeBox.sendKeys(swd.Key.CONTROL + "v");
            return ctrlVP;
        }).then(function () {
            let codeWillBeSubmitedP = navigatorfn(".hr-monaco-submit");
            return codeWillBeSubmitedP
        })
            // findelemenet=> textbox
            .then(function () {
                console.log("code copied to input box");
                resolve();
            }).catch(function (err) {
                reject(err);
            })
        // click on inputBox
        // sendkeys
        // submit code 
    })
}