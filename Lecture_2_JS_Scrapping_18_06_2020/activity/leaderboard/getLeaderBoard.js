let request = require("request");
let fs = require("fs");
let cheerio = require("cheerio");
let leaderboard = [];
let count = 0;
function eachMatchHandler(url) {
    console.log("Sending request")
    count++;
    request(url, dataReciever);
}
function dataReciever(err, res, html) {
    console.log("inside response")
    if (err == null && res.statusCode == 200) {
        //  console.log(res);
        // console.log(html);
        count--;
        parseHtml(html);

        if (count == 0) {
            // runs => sort 
            // array.sort
            console.table(leaderboard);
        }
    } else if (res.statusCode == 404) {
        console.log("Page Not found");
    } else {
        console.log(err);
        console.log(res);
    }
}
function parseHtml(html) {
    let $ = cheerio.load(html);
    
    let wTS = $(".summary span").text();
    // console.log(wTS);
    // console.log(wTS.split("won"));
    // let fVal = wTS.split("won").shift();
    // console.log(fVal.trim());
    let wTeam = wTS.split("won").shift().trim();
    console.log(wTeam);
    let bothInnings = 
    $(".card.content-block.match-scorecard-table .Collapsible");
    for (let inn = 0; inn < bothInnings.length; inn++) {
        let teamName = $(bothInnings[inn]).find("h5").text();
        //  New Zealand Innings (50 overs maximum)
        // teamName=teamName
        teamName = teamName.split("Innings")[0].trim();
        if (teamName == wTeam) {
            let rows = $(bothInnings[inn]).find("table.table.batsman tbody tr");
            for (let i = 0; i < rows.length; i++) {
                let colsinEVeryRow = $(rows[i]).find("td");
                // has class to check if an element contains the class or not
                let isPlayer = $(colsinEVeryRow[0]).hasClass("batsman-cell");
                if (isPlayer == true) {
                    let pName = $(colsinEVeryRow[0]).text();
                    pName = pName.trim();
                    let runs = $(colsinEVeryRow[2]).text();
                    // let balls = $(colsinEVeryRow[3]).text();
                    // console.log(`${pName}  of ${teamName} scored ${runs} in ${balls} balls`);
                    addtoLeaderB(pName, teamName, runs);
                    // handlePlayer(pName, teamName, runs, balls);
                    // directory => team 
                    // file => player
                }
            }
        }
        // filter rows that doen't contain batsman cell

        console.log("``````````````````````````");
    }
}

function addtoLeaderB(pName, teamName, runs) {
    // search => update 
    runs = Number(runs);
    for (let i = 0; i < leaderboard.length; i++) {
        let entry = leaderboard[i];
        if (entry.name == pName && entry.team == teamName) {
            entry.runs += runs;
            return;
        }
    }
    // create a new entry and add to leaderboard
    let newEntry = {};
    newEntry.name = pName;
    newEntry.team = teamName;
    newEntry.runs = runs;
    leaderboard.push(newEntry);
}

// export inorder to use it in another file
module.exports = eachMatchHandler;





