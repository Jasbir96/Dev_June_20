const $ = require("jquery");
const path = require("path");
const fs = require("fs");
const pty = require('node-pty');
const os = require("os");
const Terminal = require('xterm').Terminal;
let { FitAddon } = require('xterm-addon-fit');
// Make the terminal's size and geometry fit the size of #terminal-container
let myMonaco, editor;
let tabArr={};
require("jstree");
$(document).ready(async function () {
    editor = await createEditor();
    // console.log(editor);
    let pPath = process.cwd();
    let name = path.basename(pPath);
    let data = [{
        id: pPath,
        parent: "#",
        text: name
    }]
    let childArr = addCh(pPath);
    data = [...data, ...childArr];

    $("#tree").jstree({
        "core": {
            "check_callback": true,
            "data": data,
            "themes": {
                "icons": false
            }
        },
    }).on("open_node.jstree", function (e, onClickdata) {
        console.log(onClickdata);
        // if (data.node.children.length > 0) {
        //     createGC(data.node.children)
        //     return;
        // }
        // let nPath = data.node.id;
        // let arr = addChnGc(nPath);
        // for (let i = 0; i < arr.length; i++) {
        //     $("#tree").jstree().create_node(nPath, arr[i], "last");
        // }
        let children = onClickdata.node.children;
        for (let i = 0; i < children.length; i++) {
            let gcArr = addCh(children[i]);
            for (let j = 0; j < gcArr.length; j++) {
                let doesExist = $('#tree').jstree(true)
                    .get_node(gcArr[j].id);
                if (doesExist) {
                    return;
                }
                // create logic
                $("#tree").jstree().create_node(children[i], gcArr[j], "last");
            }
        }
    }).on("select_node.jstree", function (e, dataObj) {
        let fPath = dataObj.node.id;
        let isFile = fs.lstatSync(fPath).isFile();
        if (isFile) {
            setData(fPath);
            // create Tab
            createTab(fPath);
        }
    })



    // Terminal
    // Initialize node-pty with an appropriate shell
    const shell = process.env[os.platform() === 'win32' ? 'COMSPEC' : 'SHELL'];
    const ptyProcess = pty.spawn(shell, [], {
        name: 'xterm-color',
        cols: 80,
        rows: 30,
        cwd: process.cwd(),
        env: process.env
    });

    // Initialize xterm.js and attach it to the DOM
    const xterm = new Terminal();
    const fitAddon = new FitAddon();
    xterm.loadAddon(fitAddon);
    xterm.setOption('theme', {
        background: "rebeccapurple",

    });
    // Open the terminal in #terminal-container
    xterm.open(document.getElementById('terminal'));
    // Setup communication between xterm.js and node-pty
    xterm.onData(function (data) {
        ptyProcess.write(data);
    })
    ptyProcess.on('data', function (data) {
        xterm.write(data);
    });
    fitAddon.fit();

    // myMonaco.editor.defineTheme('myCustomTheme', {
    //     base: 'vs', // can also be vs-dark or hc-black
    //     inherit: true, // can also be false to completely replace the builtin rules
    //     rules: [
    //         { token: 'comment', foreground: 'ffa500', fontStyle: 'italic underline' },
    //         { token: 'comment.js', foreground: '008800', fontStyle: 'bold' },
    //         { token: 'comment.css', foreground: '0000ff' } // will inherit fontStyle from `comment` above
    //     ],
    //     colors: {
    //         'editor.foreground': '#000000',
    //         'editor.background': '#EDF9FA',
    //         'editorCursor.foreground': '#8B0000',
    //         'editor.lineHighlightBackground': '#0000FF20',
    //         'editorLineNumber.foreground': '#008800',
    //         'editor.selectionBackground': '#88000030',
    //         'editor.inactiveSelectionBackground': '#88000015'
    //     }
    // });
    // setTimeout(function () {
    // }, 2000);
    let isDark = false;
    $("#theme").on("click", function () {
        if (isDark) {
            myMonaco.editor.setTheme("vs");
        } else {
            myMonaco.editor.setTheme("vs-dark");
        }
        isDark = !isDark;
    })




})
// { "id" : "ajson1", "parent" : "#", "text" : "Simple root node" }
function addCh(parentPath) {
    let isDir = fs.lstatSync(parentPath).isDirectory();
    if (isDir == false) {
        return [];
    }
    let childrens = fs.readdirSync(parentPath);
    let cdata = [];
    for (let i = 0; i < childrens.length; i++) {
        let cPath = path.join(parentPath, childrens[i]);
        // let isDir = fs.lstatSync(cPath).isDirectory();
        // if (isDir) {
        //     let gc = fs.readdirSync(cPath);
        //     for (let j = 0; j < gc.length; j++) {
        //         let gcPath = path.join(cPath, gc[j])
        //         let gcObj = {
        //             id: gcPath,
        //             parent: cPath,
        //             text: gc[j]
        //         }
        //         cdata.push(gcObj);
        //     }
        // }
        let obj = {
            id: cPath,
            parent: parentPath,
            text: childrens[i]
        };
        cdata.push(obj);
    }
    return cdata;
}
function createEditor() {
    const amdLoader = require('./node_modules/monaco-editor/min/vs/loader.js');
    const amdRequire = amdLoader.require;
    const amdDefine = amdLoader.require.define;
    amdRequire.config({
        baseUrl: './node_modules/monaco-editor/min'
    });
    // workaround monaco-css not understanding the environment
    self.module = undefined;
    return new Promise(function (resolve, reject) {
        amdRequire(['vs/editor/editor.main'], function () {
            var editor = monaco.editor.create(document.getElementById('editor'), {
                value: [
                    'function x() {',
                    '\tconsole.log("Hello world!");',
                    '}'
                ].join('\n'),
                language: 'javascript',
                automaticLayout: true
            });
            myMonaco = monaco;
            resolve(editor);
        });
    })


}
function setData(fPath) {
    let content = fs.readFileSync(fPath, "utf-8");
    // console.log(content);
    editor.getModel().setValue(content);
    var model = editor.getModel(); // we'll create a model for you if the editor created from string value.
    let ext = fPath.split(".").pop();
    if (ext == "js") {
        ext = "javascript";
    }
    myMonaco.editor.setModelLanguage(model, ext);
}
function createTab(fPath) {
    let fName = path.basename(fPath);
    if (!tabArr[fPath]) {
        $("#tabs-row").append(`<div class="tab">
        <div class="tab-name" id=${fPath} onclick=handleTab(this)>${fName}</div>
        <i class="fas fa-times" id=${fPath} onclick=handleClose(this)></i>
        </div>`);
        tabArr[fPath] = fName;
    }
}
function handleTab(elem) {
    let fPath = $(elem).attr("id");
    setData(fPath);
}
function handleClose(elem) {
    let fPath = $(elem).attr("id");
    delete tabArr[fPath];
    $(elem).parent().remove();
    fPath = $(".tab .tab-name").eq(0).attr("id");
    if (fPath) {
        setData(fPath);
    }else
}

