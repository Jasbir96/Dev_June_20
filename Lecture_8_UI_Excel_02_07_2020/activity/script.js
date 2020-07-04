// 
const $ = require("jquery");
// document 
$(document).ready(function () {
    // console.log("Jquery Loaded");
    let db;
    $("#grid .cell").on("click", function () {
        let { colId, rowId } = getrc(this);
        let value = String.fromCharCode(65 + colId)
            + (rowId + 1);
        $("#address-input").val(value);
    })

    $("#grid .cell").on("blur", function () {
        let { colId, rowId } = getrc(this);
        db[rowId][colId].value = $(this).text();
        console.log(db);
    })
    function getrc(elem) {
        let colId = Number($(elem).attr("c-id"));
        let rowId = Number($(elem).attr("r-id"));
        return {
            colId, rowId
        }
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
                    formula: ""
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