const mongoose = require('mongoose');

// 기본 유저 스키마
const boardSchema = new mongoose.Schema({
	boardIdx : mongoose.Schema.Types.ObjectId,
    index : {type : String, required : true, unique : true},
    //category : String,
    //media : String,
    //title : String,
    //summary : String,
    //date : Date,
    //content : String,
    //hits : Number,
    //comment : Array,
    likes:Number
});

boardSchema.set('collection', 'boards'); 

module.exports = mongoose.model('Board', boardSchema);