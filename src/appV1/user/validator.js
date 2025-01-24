const Joi = require("joi");

const validateUserCreation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      error: "Invalid data in request json.",
      message: error.details.map((obj) => {
        let key = obj.path[0];
        return { [key]: obj.message.replace(/"/g, "") };
      }),
    });
  }
  next();
};

const validateUserId = (req, res, next) => {
  const schema = Joi.object({
    id: Joi.number().integer().required(),
  });

  const { error } = schema.validate(req.params);
  if (error) {
    return res.status(400).json({
      error: "Invalid data in request json.",
      message: error.details.map((obj) => {
        let key = obj.path[0];
        return { [key]: obj.message.replace(/"/g, "") };
      }),
    });
  }
  next();
};

module.exports = {
  validateUserCreation,
  validateUserId,
};
