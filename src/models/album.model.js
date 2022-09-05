const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name:{type:String, required:true},
    imageUrl:{type:String, required:true},
},{
    timestamps:true
})


exports.Album = mongoose.model('albums', userSchema)