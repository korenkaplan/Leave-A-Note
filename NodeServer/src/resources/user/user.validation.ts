import Joi from 'joi';
 
const register = Joi.object({
    name: Joi.string().required().max(30),
    email: Joi.string().required().email(),
    password: Joi.string().min(6).max(12),
    carNumber:Joi.string().min(7).max(8),
    phoneNumber:Joi.string().length(10)
  });
  const carSearch = Joi.object({
    carNumber:Joi.string().min(7).max(8),
  });
const login = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required()
});

export default {login, register,carSearch};