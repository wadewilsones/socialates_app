//Model for posts
import mongoose from "mongoose";
const Schema = mongoose.Schema;


const postsSchema = new Schema({
    author: {type:mongoose.Types.ObjectId, required:true},
    content: {type:String, required:true},
    pictures: mongoose.Types.ObjectId,
    date_created: {type:Date, required:true}
})

module.exports = mongoose.model('postsSchema', postsSchema);