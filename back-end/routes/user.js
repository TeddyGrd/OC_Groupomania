const express = require('express');
const router = express.Router();
const multer = require('multer')
const upload = multer()

const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signUp);
router.post('/login', userCtrl.login);
router.get("/logout",userCtrl.logout);

router.get("/", userCtrl.getAllUsers);
router.get("/:id", userCtrl.userInfo);
router.delete("/admin/:id", userCtrl.deleteUser);
router.put("/admin-add/:id", userCtrl.UserUpdate);
router.post("/upload",upload.single("file"),userCtrl.userPicture)


module.exports = router;