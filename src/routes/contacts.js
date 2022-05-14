const express = require("express");
const router = express.Router();
const User = require('../models/users');

router.get("/", async (req,res) => {
    try {
        const contacts = await User.find();
        res.json(contacts);
    } catch (err) {
        res.json({message:err});
    }
});

router.get("/:userId", async (req,res) => {
    try {
        const contacts = await User.findById(req.params.userId);
        res.json(contacts);
    } catch (err) {
        res.json({message:err});
    }
});

module.exports = router;
























