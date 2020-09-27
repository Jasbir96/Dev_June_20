const express = require("express")
const app = express();
app.use(express.urlencoded({ extended: true }))
const multer = require("multer");
// // filter images
const filter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    } else {
        cb(new Error("Not an Image!Please upload an image"), false)
    }
}
// // storage and naming
const multerStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + ".jpeg")
    }
})
const upload = multer({
    fileFilter: filter,
    storage: multerStorage
});
// const upload=multer({dest:"public"})
app.use(express.json());
app.post("/uploadData", upload.single("photo"), (req, res) => {
    console.log(req.body);
    console.log(req.file);
    res.status(200).json({
        message: "recieved data"
    })
})
app.listen(3000, console.log("Server started at port 3000"));