const Joi = require("joi");

const validateProjectCreation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().optional(),
    userId: Joi.number().integer().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    //let error = error.details[0].message.replace(/"/g, "");
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

const validateProjectId = (req, res, next) => {
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

const validateUserId = (req, res, next) => {
  const schema = Joi.object({
    userId: Joi.number().integer().required(),
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
  validateProjectCreation,
  validateProjectId,
  validateUserId,
};
