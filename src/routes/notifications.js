const router = require("express").Router();
const Notification = require('../models/Notification');
const Validation = require("../utils/validations");
const request = require("request");


router.post('/', async (req, res) => {
    //Validate
    // const { error } = Validation.registerValidation(req.body);
    // if (error) {
    //     return res.status(404).json({ message: error.details[0].message })
    // }

    // //Checking if the user is already in the database
    // const emailExist = await User.findOne({ email: req.body.email });

    // //Checking if the user is already in the database
    // const phoneNumberExist = await User.findOne({ phoneNumber: req.body.phoneNumber });

    // if (emailExist) {
    //     return res.status(409).json({ message: "Email already exists" });
    // }

    // if (phoneNumberExist) {
    //     return res.status(409).json({ message: "Phone number already exists" });
    // }

    console.log(req.body);

    const newNotification = new Notification({
        senderName: req.body.senderName,
        description: req.body.description,
        receivers: req.body.receivers,
    });

    try {
        const savedNotifications = await newNotification.save();
        if (savedNotifications != null) {
            const data = {
                "registration_ids": savedNotifications.receivers,
                "notification": {
                    "title": "Accompany",
                    "body": savedNotifications.senderName + ": " + savedNotifications.description,
                },
                "data": {
                    "page": "NotificationsView"
                }
            }
            console.log(data);
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
        }
        // return res.json(savedNotifications)
    } catch (error) {

    }



});

//LOGIN
router.get('/', async (req, res) => {
    try {
        const notifications = await Notification.find().sort({ date: 'descending' });
        res.json(notifications);
    } catch (error) {
        res.json({ message: error });
    }
});

module.exports = router;