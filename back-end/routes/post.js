const express = require('express');
const router = express.Router();

const multer = require('multer');
const upload = multer()

const postCtrl = require('../controllers/post');

router.get('/',postCtrl.getAllPost);
router.post('/',upload.single("file"),postCtrl.createPost);
router.put('/:id',postCtrl.modifyPost);
router.delete('/:id',postCtrl.deletePost);
router.patch('/like/:id',postCtrl.likePost);
router.patch('/dislike/:id',postCtrl.dislikePost)



module.exports = router;