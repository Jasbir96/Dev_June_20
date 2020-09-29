const express = require("express");
const postRouter = new express.Router();
const {createPost}=require("../controller/postController");
postRouter.route("").post(createPost);
// app.route("/api/v1/post/:uid").get(getPost).patch(updatePost).delete(deletePost);
module.exports = postRouter;