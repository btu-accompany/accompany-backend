
const express = require('express');
const router = express.Router();
const Suggestion = require('../models/Suggestion');
const verify = require("../utils/verifyToken");
const ROLE = require("../utils/roles");

// Gets all suggestions
router.get('/', verify.authUser, verify.authRole(ROLE.BASIC), async (req, res) => {
    try {
        const suggestions = await Suggestion.find().sort({ date: 'descending' });;
        res.json(suggestions);
    } catch (err) {
        res.json({ message: err });
    }
});

// suggestions yüklüyor
router.post('/', verify.authUser, verify.authRole(ROLE.BASIC), async (req, res) => {
    const suggestion = new Suggestion({
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
        const savedSuggestion = await suggestion.save();

        res.json(savedSuggestion);
    } catch (err) {
        res.json({
            message: err
        });
    }
});
// get spesifik
router.get('/:suggestionId', verify.authUser, verify.authRole(ROLE.BASIC), async (req, res) => {
    try {
        const suggestion = await Suggestion.findById(req.params.suggestionId);
        res.json(suggestion);
    }
    catch (err) {
        res.json({ message: err });
    }
});
// delete
router.delete('/:suggestionId', verify.authUser, verify.authRole(ROLE.BASIC), async (req, res) => {
    try {
        const removedSuggestion = await Suggestion.remove({ __id: req.params.suggestionId })
        res.json(removedSuggestion);
    }
    catch (err) {
        res.json({ message: err });
    }

});

module.exports = router;