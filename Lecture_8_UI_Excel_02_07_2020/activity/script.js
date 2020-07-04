// 
const $ = require("jquery");
const { get } = require("jquery");
// document 
$(document).ready(function () {
    // console.log("Jquery Loaded");
    let db;
    let lsc;
    $("#grid .cell").on("click", function () {
        let { colId, rowId } = getrc(this);
        let value = String.fromCharCode(65 + colId)
            + (rowId + 1);
        $("#address-input").val(value);
    })

    // val=> val
    // formula=> val
    $("#grid .cell").on("blur", function () {
        let { colId, rowId } = getrc(this);
        db[rowId][colId].value = $(this).text();
        console.log(db);
        lsc = this;
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
            rmusnds(cellObj);
        }
        cellObj.formula = $(this).val();
        // add Formula
        setusnds(lsc, cellObj.formula);
        updateCell(rowId, colId, nval, true);
        //
    })
    // set yourself to parents downstream set parent to your upstream
    function setusnds(cellObject, formula) {
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

                let { colId, rowId } = getrc(cellObject);
                // add yourself to donwstream of your parent
                parentCell.downstream.push({
                    colId: colId, rowId: rowId
                });
                cellObject.upstream.push({
                    colId: c,
                    rowId: r
                })

            }
        }
    }
    // delete formula
    function rmusnds(cellObject) {
        cellObj.formula = "";
        let { rowId, colId } = getcell(cellObject);
        for (let i = 0; i < cellObject.upstream.length; i++) {
            let uso = cellObject.upstream[i];
            let fuso = db[uso.rowId][uso.colId];
            // find index splice yourself
            let fArr = fuso.downstream.filter(function (dCell) {
                return dCell.colId != colId && dCell.rowId != rowId;
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
    function updateCell() {
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
        return db[rowId][colId];
    }
    function init() {
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
                    upstream: []

                }
                // $(AllCols[j]).html('');
                row.push(cell);
            }
            db.push(row);
        }
        console.log(db);
    }
    init();
})