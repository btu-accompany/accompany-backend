const express = require('express');
const router = express.Router();
const NearMiss = require("../models/NearMiss");
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
    fileFilter: fileFilter,
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
router.post("/", async (req, res) => {
    //TODO kodlanıcak
    const nearmiss = new NearMiss({
        title: req.body.title,
        description: req.body.description,
        img: ""
    });


    try {
        const savedNearMiss = await nearmiss.save();
        res.json(savedNearMiss);
    } catch (error) {
        res.json({ message: error });
    }

});

// near miss olayını kayıt ettikten hemen sonra bu istekte bulun img bölümünü güncellemene yarıyor
router.patch("/", upload.single("img"), async (req, res) => {
    try {
        const updatedNearMiss = await NearMiss.findOneAndUpdate(
            { _id: req.body._id },
            { $set: { img: req.file.path } },
            { new: true }
        );
        res.json(updatedNearMiss);
    } catch (error) {
        res.send(error)
    }

});

module.exports = router;