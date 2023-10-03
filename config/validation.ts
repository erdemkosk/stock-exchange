import * as Joi from 'joi';

const validationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test', 'provision')
    .default('development'),
  PORT: Joi.number().default(3000),
});

const validationOptions = {
  allowUnknown: true,
  abortEarly: true,
};

export { validationSchema, validationOptions };
