const express = require("express");

const router = express.Router();

// // controllers functions
const {
  registerUser,
  loginUser,
  photoPost,
} = require("../controllers/userController");
const { isAuth } = require("../middlewares/isAuth");
const multer = require("multer");
const fs = require("fs");

// start setting multer
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if(!fs.existsSync(`./uploads/usersphotos/${req.user.email}`)){
        fs.mkdirSync(`./uploads/usersphotos/${req.user.email}`)
    }
    cb(null, `./uploads/usersphotos/${req.user.email}`);
  },
  filename: function (req, file, cb) {
    // It is the filename that is given to the saved file.
    cb(null, file.originalname);
  },
});
//end of setting multer

// Configure storage engine instead of dest object.
const upload = multer({ storage: storage });

// register route
router.post("/register", registerUser);

//login route
router.post("/login", loginUser);

// post photo user after registration
router.patch("/updatephoto", isAuth, upload.single("file"), photoPost);

module.exports = router;
