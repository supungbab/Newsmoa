const mongoose = require('mongoose');

// 기본 보드 스키마
const boardSchema = new mongoose.Schema({
	boardIdx : mongoose.Schema.Types.ObjectId,
    index : {type : Number, required : true, unique : true},
    topimg : String,
    category : String,
    media : String,
    title : String,
    summary : String,
    date : String,
    content : String,
    hits : Number
});

boardSchema.set('collection', 'boards'); 

module.exports = mongoose.model('Board', boardSchema);