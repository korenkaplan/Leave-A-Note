import Joi from 'joi';

const create = Joi.object({ //the schema structure for creating a new instance of a Post object.
    title: Joi.string().required(),

    body: Joi.string().required(),
});
const update = Joi.object({//the schema structure for updating a new instance of a Post object.
    title: Joi.string().required(),

    body: Joi.string().required(),
});

export default {create, update};