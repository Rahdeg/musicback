const Joi = require("joi");

exports.albumValidation = (req, res, next)=>{
    const albumSchema = Joi.object({
        name:Joi.string().required(),
        imageUrl:Joi.string().required(),
    });
    const {error, value} = albumSchema.validate(req.body);
    if(error){
        console.log(error);
        return res.status(400).json(error.details[0].message);
    }
    if(value){
        next();
    }
}


exports.artistValidation = (req, res, next)=>{
    const artistSchema = Joi.object({
        name:Joi.string().required(),
        imageUrl:Joi.string().required(),
        twitter:Joi.string().required(),
        instagram:Joi.string().required(),
    });
    const {error, value} = artistSchema.validate(req.body);
    if(error){
        console.log(error);
        return res.status(400).json(error.details[0].message);
    }
    if(value){
        next();
    }
}

exports.songValidation = (req, res, next)=>{
    const songSchema = Joi.object({
        name:Joi.string().required(),
        imageUrl:Joi.string().required(),
        songUrl:Joi.string().required(),
        artist:Joi.string().required(),
        language:Joi.string().required(),
        category:Joi.string().required(),
        album:Joi.string(),
    });
    const {error, value} = songSchema.validate(req.body);
    if(error){
        console.log(error);
        return res.status(400).json(error.details[0].message);
    }
    if(value){
        next();
    }
}