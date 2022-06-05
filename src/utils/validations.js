const Joi = require('joi');


//Register Validation
const registerValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        email: Joi.string().min(6).required().email(),
        surname: Joi.string().min(2).required(),
        fcmToken: Joi.string().required(),
        departmant: Joi.string().min(3).required(),
        address: Joi.string().min(8).required(),
        phoneNumber: Joi.string().min(11).max(11).required(),
        role: Joi.string().required(),
        ppUrl: Joi.string().required(),
        password: Joi.string().min(6).required()
    });

    return schema.validate(data);
};

//Login Validation
const loginValidation = (data) => {
    const schema = Joi.object({
        phoneNumber: Joi.string().min(11).required(),
        password: Joi.string().min(6).required()
    });

    return schema.validate(data);
};

module.exports = {
    registerValidation,
    loginValidation
}