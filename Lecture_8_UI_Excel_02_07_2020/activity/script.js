// 
const $ = require("jquery");
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
        let cellObject = getcell(this);
        
        if (cellObject.value == $(this).html()) {
            lsc=this;
            return
        }

        if (cellObject.formula) {
            rmusnds(cellObject, this);
        }

        cellObject.value = $(this).text();
        updateCell(rowId, colId, cellObject.value);
        // console.log(db);
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
    function evaluate(cellObj) {
        //     upstream => go to your upstream=> get there values
        // ( A1 + A11 + A1 )= [ (,A1,+,A11,+,A1,)]=> [(,10,+,A11,+,10,)]=> ( 10 + A11 + 10 )
        // ( 10 + 20 )
        // Js => eval 
        let formula = cellObj.formula;
        console.log(formula);
        for (let i = 0; i < cellObj.upstream.length; i++) {
            let cuso = cellObj.upstream[i];
            // rId,CId => A1
            let colAddress = String.fromCharCode(cuso.colId + 65);
            let cellAddress = colAddress + (cuso.rowId + 1);
            let fusokiVal = db[cuso.rowId][cuso.colId].value;
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