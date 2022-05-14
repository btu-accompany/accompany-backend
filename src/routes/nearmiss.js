const express = require('express');
const router = express.Router();
const NearMiss = require("../models/NearMiss");
const multer = require('multer');
const path = require("path");
const request = require("request");
require("dotenv/config");

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "uploads")
    },
    filename: (req, file, callback) => {
        callback(null, Date.now() + ".jpg");
    }
});

const fileFilter = (req, file, callback) => {
    if (file.mimetype == "image/jpeg" || file.mimetype == "image/png" || file.mimetype == "image/jpg") {
        callback(null, true);
    } else {
        callback(null, false);
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 6
    },
});


//butun nearmiss olaylarini getirme
router.get('/', async (req, res) => {
    try {
        const nearmisses = await NearMiss.find();
        res.json(nearmisses);
    } catch (error) {
        res.json({ message: error });
    }

});

// idsi parametere olarak verilen nearmiss olayini getirir
router.get("/:nearmiss_id", async (req, res) => {
    try {
        const nearMiss = await NearMiss.findById(req.params.nearmiss_id);
        res.json(nearMiss);
    } catch (error) {
        res.json({ message: error });
    }
});

// near miss olayi kaydet
router.post("/", upload.single("img"), async (req, res) => {

    const nearmiss = new NearMiss({
        title: req.body.title,
        description: req.body.description,
        img: req.file.path
    });


    try {
        const savedNearMiss = await nearmiss.save();
        res.json(savedNearMiss);
    } catch (error) {
        res.json({ message: error });
    }

});


router.post("/notify-users", async (req, res) => {

    const title = req.body.title;
    const desc = req.body.desc;

    const data = {
        to: "/topics/nearmiss",
        notification: {
            title: title,
            body: desc
        },
        data: {
            page: "nearmiss"
        }
    }

    request({
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "key=" + process.env.FCM_SERVER_KEY
        },
        uri: 'https://fcm.googleapis.com/fcm/send',
        body: JSON.stringify(data),
        method: 'POST'
    }, function (error, response, body) {
        if (error) {
            res.json(err)
        } else {
            res.json(body);
        }
    });


});

module.exports = router;