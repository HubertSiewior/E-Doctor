const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

const validateRegister = (data) =>{
  
    
    const schema = Joi.object({
        name:Joi.string().min(3).max(255).required(),
        email:Joi.string().min(5).max(255).email().required(),
        password:Joi.string().min(5).max(255).required(),
    })
    return schema.validate(data);
}
const validateLogin = (data) =>{

    const schema = Joi.object({
        email:Joi.string().min(5).max(255).email().required(),
        password:Joi.string().min(5).max(255).required(),
    })
	return schema.validate(data);
	
}

const validateUpdatePassword = (data) =>{

    const schema = Joi.object({
        password:Joi.string().min(5).max(255).required(),
    })
    return schema.validate(data);
}

const validateMongoID = (data) => {
	return mongoose.Types.ObjectId.isValid(data);
}

const validateDisease = (data) =>{

    const schema = Joi.object({
        name:Joi.string().min(3).max(255).required(),
        symptoms:Joi.array().items(Joi.string().custom(validateMongoID)),
    })
    return schema.validate(data);
}

const validateEDoctor =(data) =>{

    const schema = Joi.object({
        name:Joi.string().min(3).max(255).required(),
        email:Joi.string().min(5).max(255).email().required(),
        symptoms:Joi.array().items(Joi.string().custom(validateMongoID)),
    })
    return schema.validate(data);
}
const validateEdoctorUser = (data)=>{
    const schema = Joi.object({
        email:Joi.string().min(5).max(255).email().required(),
    })
    return schema.validate(data);

}
const validateMedicine = (data)=>{
    const schema = Joi.object({
        name:Joi.string().min(3).max(255).required(),
        price:Joi.number().required(),
        withoutRecipe:Joi.boolean().required(),
        symptoms:Joi.array().items(Joi.string().custom(validateMongoID)),
    })
    return schema.validate(data);
}



module.exports = {validateRegister, validateLogin, validateMongoID,validateDisease,validateEDoctor,validateEdoctorUser,validateUpdatePassword,validateMedicine };