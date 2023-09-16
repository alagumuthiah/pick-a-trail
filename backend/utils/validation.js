import Joi from 'joi';

let userSignUpSchema = Joi.object().keys({
    userName: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(3).required()
});


let userLoginSchema = Joi.object().keys({
    userName: Joi.string().required(),
    password: Joi.string().required()
});

let schemaMapping = {
    'userLoginSchema': userLoginSchema,
    'userSignUpSchema': userSignUpSchema
}

export const requestBodyValidation = (reqBody, schema) => {
    console.log(reqBody, schema);
    if (schemaMapping[schema]) {
        const result = schemaMapping[schema].validate(reqBody);
        const { error } = result;
        console.log(error);
        if (error) {
            return error.details[0];
        }
    } else {
        return { 'message': 'No matching schema found' }
    }
}
