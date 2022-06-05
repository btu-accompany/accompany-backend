const bcrypt = require("bcryptjs");
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require('../models/users');
const Validation = require("../utils/validations");


router.post('/register', async (req, res) => {
    //Validate
    const { error } = Validation.registerValidation(req.body);
    if (error) {
        return res.json({ message: error.details[0].message })
    }

    //Checking if the user is already in the database
    const emailExist = await User.findOne({ email: req.body.email });

    //Checking if the user is already in the database
    const phoneNumberExist = await User.findOne({ phoneNumber: req.body.phoneNumber });

    if (emailExist) {
        return res.status(409).json({ message: "Email already exists" });
    }

    if (phoneNumberExist) {
        return res.status(409).json({ message: "Phone number already exists" });
    }


    // Hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //Create a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
        password: hashedPassword,
        phoneNumber: req.body.phoneNumber,
        fcmToken: req.body.fcmToken,
        surname: req.body.surname,
        departmant: req.body.departmant,
        address: req.body.address,
        role: req.body.role,
        ppUrl: req.body.ppUrl
    });

    try {
        const savedUser = await user.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.json({ message: error })
    }
});

//LOGIN
router.post('/login', async (req, res) => {
    //Validate
    const { error } = Validation.loginValidation(req.body);
    if (error) {
        return res.json({ message: error.details[0].message })
    }
    //Checking if the email exists
    const user = await User.findOne({ phoneNumber: req.body.phoneNumber });

    if (!user) {
        return res.json({ message: "Phone number is not found" });
    }

    //Is password correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) {
        return res.json({ message: "Invalid password" });
    }

    //Create and assign a token
    const token = jwt.sign({ _id: user._id, role: user.role, token: user.fcmToken }, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);

});

module.exports = router;