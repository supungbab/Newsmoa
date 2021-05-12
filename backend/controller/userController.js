const userModel = require('../models/userModel');

const userController = {
	createUser : async(id,pw,nickname,name,birth,sex,email,address,number)=>{
		const result = await userModel.create({
			id : id,
			pw : pw,
			nickname : nickname,
			name : name,
			birth : birth,
			sex : sex,
			email : email,
			address : address,
			number : number,
		});
		
		return result;
	},
	
	findMyInfo : async(id)=>{
		const result = await userModel.find().where('id').equals(id).select('salt nickname');
		console.log(result[0]);
		return result[0];
	},
	
	signCheck : async(hashed)=>{
		const result = await userModel.find().where('pwd').equals(hashed).select(' nickname');
		return result;
	},
}

module.exports=userController;