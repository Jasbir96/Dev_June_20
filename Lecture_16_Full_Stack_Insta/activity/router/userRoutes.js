const express = require("express");
const userRouter = new express.Router();
// /:uid=> get 
const { getAllUser, createUser, getUser, updateUser, deleteUser,
    checkBody, createRequest, getAllFollowers } = require("../controller/userController");

userRouter.route("/").get(getAllUser).post(checkBody, createUser);
userRouter.route("/request").post(createRequest)
userRouter.route("/request/:id").get(getAllFollowers)

userRouter.route("/:uid").get(getUser).patch(checkBody, updateUser).delete(deleteUser);

module.exports = userRouter;