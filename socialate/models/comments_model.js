//Model for comments
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const commentsSchema = new Schema({
    author: {type:mongoose.Types.ObjectId, required:true},
    content: {type:String, required:true},
    date_created: {type:Date, required:true}
})

module.exports = mongoose.model('commentsSchema', commentsSchema);