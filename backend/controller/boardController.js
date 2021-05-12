const boardModel = require('../models/boardModel');


//https://velopert.com/545 insert 배열 관련

const boardController = {
	createBoard : async(index)=>{
		const result = await boardModel.create({
			index:index,
			likes:[],
			comments:[]
		});
		
		return result;
	},

	putLike : async(index, user)=>{
		const result = await boardModel.updateOne({index : index},{
			$addToSet:{likes:user}
		});
		return result;
	},

	getLike : async(index)=>{
		const result = await boardModel.find({index:index},{likes:true});
		return result;
	},

	putComment : async(index, idx, user, comment)=>{
		const result = await boardModel.updateOne({index : index},{
			$push: { comments: {"idx":idx,"date":new Date().toString(),"user":user, "comment":comment} }
		});
		return result;
	},

	getComment : async(index)=>{
		const result = await boardModel.find({index:index},{comments:true});
		return result;
	},

	deleteComment : async(index, idx, user)=>{
		const result = await boardModel.updateOne({index : index},{
			$pull: { comments: {"idx":idx, "user":user }}
		});
		return result;
	},
	
	findBoardInfo : async(index)=>{
		const result = await boardModel.find().where('index').equals(index);
		return result;
	},
}

module.exports=boardController;