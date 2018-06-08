const Joi = require('joi');
const joiValidator = require('express-joi-validator');

const loginSchema = {
    body: {
        email: Joi.string().email().required(),
        password: Joi.string().min(8).max(30).required(),
    }
}

const registerSchema = {
    body: Object.assign({ name: Joi.string().min(5).max(50).required() }, loginSchema.body)
}

module.exports = {
    regValidator: joiValidator(registerSchema),
    loginValidator: joiValidator(loginSchema),
};
