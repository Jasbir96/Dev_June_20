const $ = require("jquery");
const path = require("path");
const fs = require("fs");
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
            "check_callback" : true,
            "data": data
        },
    }).on("select_node.jstree",
        function (e, data) {

            let cNodePath = data.node.id;
            let cArr = createData(cNodePath);
            for (let i = 0; i < cArr.length; i++) {
                console.log(cArr[i]);
                $('#tree').jstree().create_node(cNodePath, cArr[i], "last");

            }
        })
})
// { "id" : "ajson1", "parent" : "#", "text" : "Simple root node" }
function createData(parentPath) {
    let childrens = fs.readdirSync(parentPath);
    let cdata = [];
    for (let i = 0; i < childrens.length; i++) {
        let cPath = path.join(parentPath, childrens[i]);
        let obj = {
            id: cPath,
            parent: parentPath,
            text: childrens[i]
        };
        cdata.push(obj);
    }
    return cdata;
}