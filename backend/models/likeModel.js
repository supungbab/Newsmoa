const mongoose = require('mongoose');

// 기본 보드 스키마
const likeSchema = new mongoose.Schema({
    index : {type : Number, required : true},
    user : {type : String, required : true},
    nickname : {type : String, required : true}
});

likeSchema.set('collection', 'likes'); 

module.exports = mongoose.model('Liks', likeSchema);