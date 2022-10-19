const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    posterId:{type:String, required:true},
    post:{type:String},
    picture:{type:String},
    likers:{type:[String], required: true},
},
    {timestamps : true}   
);

module.exports = mongoose.model('Post',postSchema);