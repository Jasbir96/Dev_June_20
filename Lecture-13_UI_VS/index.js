const $ = require("jquery");
const path = require("path");
const fs = require("fs");
const { dir } = require("console");
require("jstree");
$(document).ready(function () {

    // bubbling
    // css
    // $("#tree").html(dirName).on("click", function () {
    //     let childrens = fs.readdirSync(parent);
    //     // console.log(childrens);
    //     for (let i = 0; i < childrens.length; i++) {
    //         $(this).append(`<li>${childrens[i]}</li>`)
    //     }
    // });
    // unique id => element
    // parent=> ?id:#
    // text
    // i have path
    let pPath = process.cwd();
    let name = path.basename(pPath);

    let data = [{
        id: pPath,
        parent: "#",
        text: name
    }]
    let childArr = createData(pPath);

    data = [...data, ...childArr];
    $("#tree").jstree({
        "core": {
            "data": data
        },
    })

})
// { "id" : "ajson1", "parent" : "#", "text" : "Simple root node" }
function createData(parent) {
    let childrens = fs.readdirSync(parent);
    let cdata = [];
    for (let i = 0; i < childrens.length; i++) {
        let id = path.join(parent, childrens[i]);
        let obj = {
            id: id,
            parent:parent,
            text: childrens[i]
        };
        cdata.push(obj);
    }
    return cdata;
}