// 
const $ = require("jquery");
const fs = require("fs");
// document 
const dialog = require("electron").remote.dialog;
$(document).ready(function () {
    // console.log("Jquery Loaded");
    let db;
    let lsc;

    $(".content-container").on("scroll", function () {
        let scrollY = $(this).scrollTop();
        let scrollX = $(this).scrollLeft();
        // console.log(scrollY);
        $("#top-row,#top-left-cell").css("top", scrollY + "px");
        $("#top-left-cell,#left-col").css("left", scrollX + "px");
    })

    $("#grid .cell").on("keyup", function () {
        let { rowId } = getrc(this);
        let ht = $(this).height();
        $($("#left-col .cell")[rowId]).height(ht);

    })

    $(".menu").on("click", function () {
        let Id = $(this).attr("id");
        // File
        $(".menu-options").removeClass("selected");
        $(`#${Id}-menu-options`).addClass("selected");
    })

    let lcell;
    $("#grid .cell").on("click", function () {
        let { colId, rowId } = getrc(this);
        let value = String.fromCharCode(65 + colId)
            + (rowId + 1);
        let cellObject = db[rowId][colId];
        $("#address-input").val(value);
        $("#formula-input").val(cellObject.formula);
        //    set cell formula 
        if (lcell && this != lcell) {
            $(lcell).removeClass("selected");
        }
        $(this).addClass("selected");
        if (cellObject.bold) {
            $("#bold").addClass("isOn")
        } else {
            $("#bold").removeClass("isOn")
        }
        lcell = this;
    })
    $("#bold").on("click", function () {
        $(this).toggleClass("isOn");
        let isBold = $(this).hasClass("isOn");
        $("#grid .cell.selected").css("font-weight", isBold ? "bolder" : "normal");
        let cellElem = $("#grid .cell.selected");
        let cellObject = getcell(cellElem);
        cellObject.bold = isBold;
    })

    $("#font-family").on("change", function () {
        let fontFamily = $(this).val();
        $("#grid .cell.selected").css("font-family", fontFamily);
        let cellElem = $("#grid .cell.selected");
        let cellObject = getcell(cellElem);
        cellObject.fontFamily = fontFamily
    })

    $("#bg-color").on("change", function () {
        let bgColor = $(this).val();
        let cellElem = $("#grid .cell.selected");
        cellElem.css("background-color", bgColor);
        let cellObject = getcell(cellElem);
        cellObject.bgColor = bgColor
    })
    $("#New").on("click", function () {
        db = [];
        let AllRows = $("#grid").find(".row");
        for (let i = 0; i < AllRows.length; i++) {
            let row = [];
            let AllCols = $(AllRows[i]).find(".cell");
            for (let j = 0; j < AllCols.length; j++) {
                //    DB
                let cell = {
                    value: "",
                    formula: "",
                    downstream: [],
                    upstream: [],
                    bold: false,
                    underline: false,
                    italic: false,
                    fontFamily: "Arial",
                    fontSize: 12,
                    bgColor: "white",
                    textColor: "black",
                    halign: "left"
                }

                $(AllCols[j]).html('');
                $(AllCols[j]).css("font-weight", cell.bold ? "bolder" : "normal");
                $(AllCols[j]).css("font-style", cell.italic ? "italic" : "normal");
                $(AllCols[j]).css("text-decoration", cell.underline ? "underline" : "none");
                $(AllCols[j]).css("font-family", cell.fontFamily);
                $(AllCols[j]).css("font-size", cell.fontSize);
                $(AllCols[j]).css("color", cell.textColor);
                $(AllCols[j]).css("background-color", cell.bgColor);
                $(AllCols[j]).css("text-align", cell.halign);

                row.push(cell);
            }
            db.push(row);
        }
        console.log(db);
        // $("#grid .cell").eq(0).trigger("click");
        let cellArr = $("#grid .cell");
        $(cellArr[0]).trigger("click");
    })

    $("#Save").on("click", async function () {
        let sdb = await dialog.showOpenDialog();
        let fp = sdb.filePaths[0];
        if (fp == undefined) {
            console.log("Please select file first");
            return;
        }
        let jsonData = JSON.stringify(db);
        fs.writeFileSync(fp, jsonData);
        // open dialogBox
        // select file
        // write 
        // Input=> file
    })
    $("#Open").on("click", async function () {
        let sdb = await dialog.showOpenDialog();
        let fp = sdb.filePaths[0];
        if (fp == undefined) {
            console.log("Please select file first");
            return;
        }
        let buffer = fs.readFileSync(fp);
        db = JSON.parse(buffer);
        let AllRows = $("#grid").find(".row");
        for (let i = 0; i < AllRows.length; i++) {
            let AllCols = $(AllRows[i]).find(".cell");
            for (let j = 0; j < AllCols.length; j++) {
                //    DB
                let cell = db[i][j];
                $(AllCols[j]).html(cell.value);
                $(AllCols[j]).css("font-weight", cell.bold ? "bolder" : "normal");
                $(AllCols[j]).css("font-style", cell.italic ? "italic" : "normal");
                $(AllCols[j]).css("text-decoration", cell.underline ? "underline" : "none");
                $(AllCols[j]).css("font-family", cell.fontFamily);
                $(AllCols[j]).css("font-size", cell.fontSize);
                $(AllCols[j]).css("color", cell.textColor);
                $(AllCols[j]).css("background-color", cell.bgColor);
                $(AllCols[j]).css("text-align", cell.halign);
            }
        }
    })
    // **************Formula stuff starts here******************
    // val=> val
    // formula=> val
    $("#grid .cell").on("blur", function () {
        let { colId, rowId } = getrc(this);
        let cellObject = getcell(this);
        //if yo randomly click on any cell 
        lsc = this;
        if (cellObject.value == $(this).html()) {
            return;
        }
        if (cellObject.formula) {
            rmusnds(cellObject, this);
        }
        cellObject.value = $(this).text();
        updateCell(rowId, colId, cellObject.value);
        // console.log(db);
    })
    // val=> formula convert
    //formula => new formula 
    $("#formula-input").on("blur", function () {
        let cellObj = getcell(lsc);
        if (cellObj.formula == $(this).val()) {
            return
        }
        let { colId, rowId } = getrc(lsc);
        if (cellObj.formula) {
            // delete Formula
            rmusnds(cellObj, lsc);
        }
        cellObj.formula = $(this).val();
        // add Formula
        setusnds(lsc, cellObj.formula);
        // 4. calculate value from formula
        let nVal = evaluate(cellObj);
        console.log(nVal);
        // update your cell
        updateCell(rowId, colId, nVal);
        //
    })
    //     upstream => go to your upstream=> get there values
    // (   A1 +  A1 - A11 )= [ (,A11,+,A11,+,A1,)]=> [(,10,+,A11,+,10,)]=> ( 10 + A11 + 10 )
    // ( 10 + 20 )
    // Js => eval 
    function evaluate(cellObj) {
        let formula = cellObj.formula;
        console.log(formula);
        for (let i = 0; i < cellObj.upstream.length; i++) {
            let cuso = cellObj.upstream[i];
            // rId,CId => A1
            let colAddress = String.fromCharCode(cuso.colId + 65);
            let cellAddress = colAddress + (cuso.rowId + 1);
            let fusokiVal = db[cuso.rowId][cuso.colId].value;
            //  remove formula 
            // return 
            let formulCompArr = formula.split(" ");
            formulCompArr = formulCompArr.map(function (elem) {
                if (elem == cellAddress) {
                    return fusokiVal;
                } else {
                    return elem;
                }
            })
            formula = formulCompArr.join(" ");
        }
        console.log(formula);
        // infix evaluation
        return eval(formula);
    }
    // set yourself to parents downstream set parent to your upstream
    function updateCell(rowId, colId, nVal) {
        let cellObject = db[rowId][colId];
        cellObject.value = nVal;
        // update ui 
        $(`#grid .cell[r-id=${rowId}][c-id=${colId}]`).html(nVal);

        for (let i = 0; i < cellObject.downstream.length; i++) {
            let dsocordObj = cellObject.downstream[i];
            let dso = db[dsocordObj.rowId][dsocordObj.colId];
            let dsonVal = evaluate(dso);
            updateCell(dsocordObj.rowId, dsocordObj.colId, dsonVal);
        }

    }
    function setusnds(cellElement, formula) {
        // (A1 + B1)
        formula = formula.replace("(", "").replace(")", "");
        // "A1 + B1"
        let formulaComponent = formula.split(" ");
        // [A1,+,B1]
        for (let i = 0; i < formulaComponent.length; i++) {
            let charAt0 = formulaComponent[i].charCodeAt(0);
            if (charAt0 > 64 && charAt0 < 91) {
                let { r, c } = getParentRowCol(formulaComponent[i], charAt0);
                let parentCell = db[r][c];

                let { colId, rowId } = getrc(cellElement);
                // 1. 
                let cell = getcell(cellElement);
                // add yourself to donwstream of your parent
                parentCell.downstream.push({
                    colId: colId, rowId: rowId
                });
                // 2. 
                cell.upstream.push({
                    colId: c,
                    rowId: r
                })

            }
        }
    }
    // delete formula
    function rmusnds(cellObject, cellElem) {
        // 3.
        cellObject.formula = "";
        let { rowId, colId } = getrc(cellElem);
        for (let i = 0; i < cellObject.upstream.length; i++) {
            let uso = cellObject.upstream[i];
            let fuso = db[uso.rowId][uso.colId];
            // find index splice yourself
            // 02
            // 00,01,02
            let fArr = fuso.downstream.filter(function (dCell) {
                return !(dCell.colId == colId && dCell.rowId == rowId);
            })
            fuso.downstream = fArr;
            // let fArr = []
            // for (let j = 0; j < fuso.downstream.length; j++) {
            //     if (dCell.colId != colId && dCell.rowId != rowId) {
            //         fArr.push(fuso.downstream[i]);
            //     }
            // }
        }
        cellObject.upstream = [];

    }
    // [4,0]=>"40"
    function getParentRowCol(cellName, charAt0) {
        let sArr = cellName.split("");
        sArr.shift();
        let sRow = sArr.join("");
        let r = Number(sRow) - 1;
        let c = charAt0 - 65;
        return { r, c };
    }

    // get row and col from ui
    function getrc(elem) {
        let colId = Number($(elem).attr("c-id"));
        let rowId = Number($(elem).attr("r-id"));
        return {
            colId, rowId
        }
    }
    // Get cell from db
    function getcell(cellElem) {
        let { colId, rowId } = getrc(cellElem);
        console.log(colId + " " + rowId);
        return db[rowId][colId];
    }


    function init() {
        $("#File").trigger("click");
        $("#New").trigger("click");
        // db = [];
        // let AllRows = $("#grid").find(".row");
        // for (let i = 0; i < AllRows.length; i++) {
        //     let row = [];
        //     let AllCols = $(AllRows[i]).find(".cell");
        //     for (let j = 0; j < AllCols.length; j++) {
        //         //    DB
        //         let cell = {
        //             value: "",
        //             formula: "",
        //             downstream: [],
        //             upstream: []

        //         }
        //         $(AllCols[j]).html('');
        //         row.push(cell);
        //     }
        //     db.push(row);
        // }
        // console.log(db);
    }
    init();
})