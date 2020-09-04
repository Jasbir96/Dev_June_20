const express = require("express");
const userRouter = new express.Router();
// /:uid=> get 
const { getAllUser, createUser, getUser, updateUser, deleteUser ,checkBody} = require("../controller/userController");
userRouter.route("/").get(getAllUser).post(checkBody,createUser);
userRouter.route("/:uid").get(getUser).patch(checkBody,updateUser).delete(deleteUser);
module.exports = userRouter;