const mongoose = require('mongoose');

// 기본 보드 스키마
const boardSchema = new mongoose.Schema({
	boardIdx : mongoose.Schema.Types.ObjectId,
    index : {type : String, required : true, unique : true},
    topimg : String,
    category : String,
    media : String,
    title : String,
    summary : String,
    date : Date,
    content : String,
    hits : Number,
    comments : {type : Array, required : true},
    likes: Array
});

boardSchema.set('collection', 'boards'); 

module.exports = mongoose.model('Board', boardSchema);