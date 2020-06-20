let request = require("request");
let fs = require("fs");
let cheerio = require("cheerio");
console.log("Request send");
let url = "https://www.espncricinfo.com/series/8039/scorecard/656495/australia-vs-new-zealand-final-icc-cricket-world-cup-2014-15";

request(url, dataReciever);
function dataReciever(err, res, html) {
    if (err == null && res.statusCode == 200) {
        //  console.log(res);
        // console.log(html);
        parseHtml(html);
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
    let bothInnings = $(".card.content-block.match-scorecard-table .Collapsible");
    for (let inn = 0; inn < bothInnings.length; inn++) {
        let teamName = $(bothInnings[inn]).find("h5").text();
        //  New Zealand Innings (50 overs maximum)
        // teamName=teamName
        teamName = teamName.split("Innings")[0].trim();
        if(teamName==wTeam){
            let rows = $(bothInnings[inn]).find("table.table.batsman tbody tr");
            for (let i = 0; i < rows.length; i++) {
                let colsinEVeryRow = $(rows[i]).find("td");
                // has class to check if an element contains the class or not
                let isPlayer = $(colsinEVeryRow[0]).hasClass("batsman-cell");
                if (isPlayer == true) {
                    let pName = $(colsinEVeryRow[0]).text();
                    pName = pName.trim();
                    let runs = $(colsinEVeryRow[2]).text();
                    let balls = $(colsinEVeryRow[3]).text();
                    console.log(`${pName}  of ${teamName} scored ${runs} in ${balls} balls`);
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