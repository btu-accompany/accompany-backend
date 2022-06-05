
const express = require('express');
const router = express.Router();
const Post = require('../models/Suggestion');
const verify = require("../utils/verifyToken");
const ROLE = require("../utils/roles");

// Gets all posts
router.get('/', verify.authUser, verify.authRole(ROLE.BASIC), async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (err) {
        res.json({ message: err });
    }
});

// post yüklüyor
router.post('/', verify.authUser, verify.authRole(ROLE.BASIC), async (req, res) => {
    const post = new Post({
        type: req.body.type,
        name: req.body.name,
        fcmToken: req.body.fcmToken,
        surname: req.body.surname,
        department: req.body.department,
        topic: req.body.topic,
        content: req.body.content,
        phoneNumber: req.body.phoneNumber,
        userId: req.body.userId,
        userDepartment: req.body.userDepartment,
        ppUrl: req.body.ppUrl
    });
    try {
        const savedPost = await post.save();

        res.json(savedPost);
    } catch (err) {
        res.json({
            message: err
        });
    }
});
// get spesifik
router.get('/:postId', verify.authUser, verify.authRole(ROLE.BASIC), async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        res.json(post);
    }
    catch (err) {
        res.json({ message: err });
    }
});
// delete
router.delete('/:postId', verify.authUser, verify.authRole(ROLE.BASIC), async (req, res) => {
    try {
        const removedPost = await Post.remove({ __id: req.params.postId })
        res.json(removedPost);
    }
    catch (err) {
        res.json({ message: err });
    }

});

module.exports = router;