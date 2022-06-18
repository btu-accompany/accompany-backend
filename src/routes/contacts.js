const express = require("express");
const router = express.Router();
const User = require('../models/users');
const verify = require("../utils/verifyToken");
const ROLE = require("../utils/roles");
const multer = require('multer');
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "uploads")
    },
    filename: (req, file, callback) => {
        callback(null, Date.now() + ".jpg");
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 6
    },
});

router.get("/", verify.authUser, verify.authRole(ROLE.BASIC), async (req, res) => {
    try {
        const contacts = await User.find();
        res.json(contacts);
    } catch (err) {
        res.json({ message: err });
    }
});



// router.get("/search", verify.authUser, verify.authRole(ROLE.BASIC), async (req, res) => {

//     try {
//         const searchedName = "Ke";
//         // const foundUsers = User.find({ name: { $regex: searchedName, $options: 'i' } } || { surname: { $regex: searchedName, $options: 'i' } });
//         const foundUsers = User.find({ name: { $regex: '.*' + searchedName + '.*' } }).limit(5);
//         console.log(foundUsers);
//         res.send("test");

//     } catch (err) {
//         res.json({ message: err });
//     }
// });

router.get("/:userId", verify.authUser, verify.authRole(ROLE.BASIC), async (req, res) => {
    try {
        const contacts = await User.findById(req.params.userId);
        res.json(contacts);
    } catch (err) {
        res.json({ message: err });
    }
});

router.get("/getbyphonenumber/:phonenumber", async (req, res) => {
    try {
        const user = await User.findOne({ "phoneNumber": req.params.phonenumber });
        res.json(user);
    } catch (err) {
        res.json({ message: err });
    }
});

//güncelleme
router.patch("/update/:userId", verify.authUser, verify.authRole(ROLE.BASIC), upload.single("ppUrl"), async (req, res) => {
    try {
        const updatedUser = await User.findOneAndUpdate(
            { _id: req.params.userId },
            {
                $set: {
                    name: req.body.name,
                    departmant: req.body.departmant,
                    email: req.body.email,
                    address: req.body.address,
                    phoneNumber: req.body.phoneNumber,
                }
            },
            { new: true }
        );
        const updatedUser2 = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: { ppUrl: req.file.path } },
            { new: true }
        );

        res.json(updatedUser2);
    } catch (err) {
        res.json({ message: err });
    }
});

//fcm token guncelleme
router.patch("/update/fcmtoken/:userId", async (req, res) => {
    try {
        const updatedUser = await User.findOneAndUpdate(
            { _id: req.params.userId },
            {
                $set: {
                    fcmToken: req.body.fcmToken,
                }
            },
            { new: true }
        );
        res.json(updatedUser);
    } catch (err) {
        res.json({ message: err });
    }
});


module.exports = router;
























