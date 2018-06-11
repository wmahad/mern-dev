const Joi = require('joi');
const joiValidator = require('express-joi-validator');

const loginSchema = {
    body: {
        email: Joi.string().email().required(),
        password: Joi.string().min(8).max(30).required(),
    }
};

const registerSchema = {
    body: Object.assign({ name: Joi.string().min(5).max(50).required() }, loginSchema.body)
};

const profileSchema = {
    body: {
        handle: Joi.string().min(2).max(40).required(),
        company: Joi.string(),
        website: Joi.string().uri(),
        location: Joi.string(),
        status:  Joi.string().required(),
        skills:  Joi.string().required(),
        bio:  Joi.string(),
        githubUsername:  Joi.string(),
        youtube: Joi.string().uri(),
        twitter: Joi.string().uri(),
        facebook: Joi.string().uri(),
        linkedin: Joi.string().uri(),
        instagram: Joi.string().uri(),
    }
};

const expSchema = {
    body: {
        title: Joi.string().min(8).required(),
        company: Joi.string().min(8).required(),
        from: Joi.date().required(),
        to: Joi.date(),
        current: Joi.boolean(),
        location: Joi.string(),
        description: Joi.string(),
    }
}

const eduSchema = {
    body: {
        school: Joi.string().min(8).required(),
        degree: Joi.string().min(8).required(),
        from: Joi.date().required(),
        to: Joi.date(),
        current: Joi.boolean(),
        field: Joi.string().min(8).required(),
        description: Joi.string(),
    }
}

const postSchema = {
    body: {
        text: Joi.string().min(50).max(300).required(),
    }
}

module.exports = {
    regValidator: joiValidator(registerSchema),
    loginValidator: joiValidator(loginSchema),
    profileValidator: joiValidator(profileSchema),
    expValidator: joiValidator(expSchema),
    eduValidator: joiValidator(eduSchema),
    postValidator: joiValidator(postSchema),
};
