const mongoose = require('mongoose');

// 기본 유저 스키마

/*
mongoose 스키마의 다양한 속성
속성은 필드에 추가하여 더 많은 기능을 추가합니다.

required:꼭 입력해야 한다.
unique:다른 행과 중복되면 안 된다.
trim:공백을 제거합니다.(문자열 타입에 사용)
default:문서가 생성되면 기본값으로 저장됩니다.
lowercase:대문자를 소문자로 저장한다(문자열 타입)
match:정규식으로 저장하려는 값과 비교한다.
validate:함수로 개발자가 조건을 만듭니다.
set:값을 입력할 때 함수로 조건을 만듭니다.
get:값을 출력할 때 함수로 조건을 만듭니다.
ref:해당하는 모델을 참조할 때 사용한다.

*/
const userSchema = new mongoose.Schema({
	userIdx : mongoose.Schema.Types.ObjectId,
	id : {type : String, required : true, unique : true},
	pw:{
		type:String,
		validate:[
			function(pw){
			return pw&&pw.length>6;
			},'비밀번호를 입력하거나 길이가 6보다커야합니다.'
		]
	},
	nickname : {type : String, required : true, unique : true},
	name : {type : String, required : true},
	birth : { type: String, match:/^\d{4}-\d{2}-\d{2}$/, required : true },
	sex : {type : Boolean, required : true},
	email : {type : String, required : true},
	number : {type:String, match:/^\d{3}-\d{3,4}-\d{4}$/},
	fit : String,
	taste : Array
});

userSchema.set('collection', 'users');
module.exports = mongoose.model('User', userSchema);
