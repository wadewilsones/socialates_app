//Model for users
import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema({
    username: {type:String, required:true},
    password: {type:String, required:true},
    first_name: {type:String, required:true},
    last_name: {type:String, required:true},
    profile_pic: mongoose.Types.ObjectId,
    country:String,
    city:String,
    dob:Date,
    marital_status:String,
    friends: [mongoose.Types.ObjectId]
})

module.exports =  mongoose.models.UserSchema || mongoose.model('UserSchema', UserSchema);