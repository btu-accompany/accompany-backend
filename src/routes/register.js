const express = require("express");
const router = express.Router();
const User = require('../models/users');

router.get("/", (req,res) => {
    res.send("we are on register Page");

})


router.post("/", (req,res) => {
    const user = new User({
        ppUrl: req.body.ppUrl,
        fcmToken: req.body.fcmToken,
        name: req.body.name,
        surname: req.body.surname,
        departmant: req.body.departmant,
        email: req.body.email,
        address: req.body.address,
        password: req.body.password,
        phoneNumber: req.body.phoneNumber
    });

    user.save()
        .then(data => {
            res.json(data);

        })
        .catch(err => {
            res.json({message: err});

        })
});
module.exports = router;
























