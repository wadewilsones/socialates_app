//Model for comments
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const PictureSchema = new Schema({
    author: {type:mongoose.Types.ObjectId, required:true},
    content: {type:Buffer, required:true},
    date_created: {type:Date, required:true}
})

module.exports = mongoose.model('PictureSchema', PictureSchema);