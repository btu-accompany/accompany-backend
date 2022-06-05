const express = require("express");
const router = express.Router();
const User = require('../models/users');
const verify = require("../utils/verifyToken");
const ROLE = require("../utils/roles");

router.get("/", verify.authUser, verify.authRole(ROLE.BASIC), async (req, res) => {
    try {
        const contacts = await User.find();
        res.json(contacts);
    } catch (err) {
        res.json({ message: err });
    }
});

router.get("/:userId", verify.authUser, verify.authRole(ROLE.BASIC), async (req, res) => {
    try {
        const contacts = await User.findById(req.params.userId);
        res.json(contacts);
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;
























