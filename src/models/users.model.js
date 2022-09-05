const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true},
    imageUrl:{type:String, required:true},
    userId:{type:String, required:true},
    emailVerified:{type:Boolean, required:true},
    role:{type:String, required:true},
    authTime:{type:String, required:true}
},{
    timestamps:true
})


exports.User = mongoose.model('Musics', userSchema)