const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name:{type:String, required:true},
    imageUrl:{type:String, required:true},
    twitter:{type:String, required:true},
    instagram:{type:String, required:true},
},{
    timestamps:true
})


exports.Artist = mongoose.model('artists', userSchema)