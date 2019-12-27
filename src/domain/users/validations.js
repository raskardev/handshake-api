const Joi = require('@hapi/joi');

const createValidator = Joi.object().keys({
  name: Joi.string().required(),
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .min(6)
    .required(),
});

const updateValidator = Joi.object().keys({
  name: Joi.string(),
  email: Joi.string(),
  updatedAt: Joi.string(),
});

const createValidation = (user) => createValidator.validate(user);
const updateValidation = (user) => updateValidator.validate(user);

module.exports = {
  createValidation,
  updateValidation,
};
