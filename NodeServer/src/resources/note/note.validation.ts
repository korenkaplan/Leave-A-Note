import Joi from 'joi';

export default {
  createNote: Joi.object({
    damaged_user_id: Joi.string().required(),
    hitting_user_car: Joi.string().required(),
    hitting_user_phone: Joi.string().required(),
    hitting_user_name: Joi.string().required(),
    imageSource: Joi.string().required(),
  }),
};
