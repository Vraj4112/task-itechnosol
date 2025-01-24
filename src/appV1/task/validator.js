const Joi = require("joi");

const validateTaskCreation = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().optional(),
    status: Joi.string().required(),
    projectId: Joi.number().integer().required(),
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

const validateTaskId = (req, res, next) => {
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

const validateProjectId = (req, res, next) => {
  const schema = Joi.object({
    projectId: Joi.number().integer().required(),
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
  validateTaskCreation,
  validateTaskId,
  validateProjectId,
};
