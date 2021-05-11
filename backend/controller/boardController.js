const boardModel = require('../models/boardModel');

const boardController = {
	createBoard : async(index)=>{
		const result = await boardModel.create({
			index:index,
			likes:0
		});
		
		return result;
	},

	like : async(index)=>{
		const result = await boardModel.updateOne({index : index},{
			$inc:{likes:1}
		});
		
		return result;
	},
	
	findBoardInfo : async(index)=>{
		const result = await boardModel.find().where('boardIdx').equals(index);
		return result;
	},
}

module.exports=boardController;