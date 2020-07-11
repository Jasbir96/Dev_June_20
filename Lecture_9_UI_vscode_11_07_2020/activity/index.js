const $ = require('jquery');
require('jstree');
const nodePath = require('path')

//npm install --save-dev jstree
//npm install --save-dev jquery
$(document).ready(function(){

    //editor
    //terminal
    //tabs

    //tree view
    let currPath = process.cwd();
    console.log(currPath);
    console.log(getName(currPath));

    let data = [];
    let baseobj = {
        id : currPath,
        parent : "#",
        text : getName(currPath)
    };

    data.push(baseobj);


    $('#file-explorer').jstree({
        "core" : {
             "data": data
          }
    })
})

function getName(path){
    return nodePath.basename(path);
}
