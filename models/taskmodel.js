'use strict'
const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,'must be provided'],
            trim:true,
            maxlength:[20,"name cannot be more than 20 characters"],
        },
        completed:{
            type:Boolean,
            default:false
        },
    },{timestamps:true}
);

const Blog = mongoose.model('Product',TaskSchema);

module.exports = Blog;