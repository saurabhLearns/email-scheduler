const Joi = require('joi');


module.exports = Object.freeze({
    create_jobs: {
        payload: Joi.array().items(Joi.object().keys({
            email: Joi.string().required(),
            time: Joi.string().required(),
            subject: Joi.string(),
            body: Joi.string()
        })),
        failAction: (request, h, err) => err
    },
    get_jobs: {
        query: Joi.object().keys({ page: Joi.number(), limit: Joi.number() }),
        failAction: (request, h, err) => err
    },
    get_job: {
        params: Joi.object().keys({ id: Joi.string().required() }),
        failAction: (request, h, err) => err
    },
})
