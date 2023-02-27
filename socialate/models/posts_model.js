//Model for posts
import mongoose from "mongoose";
const Schema = mongoose.Schema;


const PostsSchema = new Schema({
    author: {type:Schema.Types.ObjectId, required:true},
    content: {type:String, required:true},
    date_created: {type:String, required:true}
})

module.exports = mongoose.model('PostsSchema', PostsSchema);