const express = require("express");
const userRouter = new express.Router();
const multer = require("multer");
// /:uid=> get 
const { getAllUser, createUser, getUser, updateUser, deleteUser,
    checkBody, createRequest, getAllFollowers, getCountOfAllFollowers, acceptRequestHandler } = require("../controller/userController");


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
        cb(null, 'public/user')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + ".jpeg")
    }
})
const upload = multer({
    fileFilter: filter,
    storage: multerStorage
});
userRouter.route("/").get(getAllUser).post(checkBody, createUser);
userRouter.route("/request").post(createRequest).patch(acceptRequestHandler)
userRouter.route("/request/:id").get(getAllFollowers)
userRouter.route("/request/count/:id").get(getCountOfAllFollowers);
// photo=> file=> save 
// send metadata about that file to next middlewarse
userRouter.route("/:uid").get(getUser).patch(upload.single("photo"), updateUser).delete(deleteUser);

module.exports = userRouter;