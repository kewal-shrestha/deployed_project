const Joi = require("joi");
const statusEnum = require("../constants/taskStatus");

module.exports.createTaskSchema = Joi.object({
  title: Joi.string().optional(),
  description: Joi.string().required(),
  status: Joi.string()
    .valid(...statusEnum)
    .optional(),
});

module.exports.updateTaskSchema = Joi.object({
  title: Joi.string().optional(),
  description: Joi.string().optional(),
  status: Joi.string()
    .valid(...statusEnum)
    .optional(),
});

module.exports.updateStatusSchema = Joi.object({
  status: Joi.string()
    .valid(...statusEnum)
    .required(),
});
