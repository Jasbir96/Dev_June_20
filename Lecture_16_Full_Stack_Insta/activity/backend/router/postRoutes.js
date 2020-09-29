const express = require("express");
const postRouter = new express.Router();
const { createPost } = require("../controller/postController");
const multer=require("multer");
const filter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    } else {
        cb(new Error("Not an Image!Please upload an image"),
            false)
    }
}
// // storage and naming
const multerStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/post')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + ".jpeg")
    }
})

const upload = multer({
    fileFilter: filter,
    storage: multerStorage
});
postRouter.route("").post(upload.single("postImg"), createPost);
// app.route("/api/v1/post/:uid").get(getPost).patch(updatePost).delete(deletePost);
module.exports = postRouter;