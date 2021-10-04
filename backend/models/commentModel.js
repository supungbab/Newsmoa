const mongoose = require('mongoose');

// 기본 보드 스키마
const commentSchema = new mongoose.Schema({
    index : {type : Number, required : true},
    user : {type : String, required : true},
    nickname : {type : String, required : true},
    comment : {type : String, required : true},
    createdAt: {type: Date, default: Date.now},
});

commentSchema.set('collection', 'comments'); 

module.exports = mongoose.model('Comment', commentSchema);