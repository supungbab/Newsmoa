const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const YOUR_SECRET_KEY = process.env.SECRET_KEY;


const userController = {
	createToken : async (req, res, next) => {
		try {
			const user = await User.find(req.body);
			if (user.length) {
				const token = jwt.sign({
					user_id: user[0].user_id
				}, YOUR_SECRET_KEY, {
					expiresIn: '1h'
				});
				res.cookie('user', token);
				res.status(201).json({
					result: 'ok',
					token
				});
			} else {
				res.status(400).json({ error: 'invalid user' });
			}
		} catch (err) {
			console.error(err);
			next(err);
		}
	},
	createUser : async (req, res, next) => {
		try {
			const user = await new userModel(req.body).save();
			res.status(201).json({
				result: 'ok',
				user: user
			});
		} catch (err) {
			console.error(err);
			next(err);
		}
	},
	
	findMyInfo : async(id)=>{
		const result = await userModel.find().where('id').equals(id).select('salt nickname');
		return result[0];
	},
	
	signCheck : async(hashed)=>{
		const result = await userModel.find().where('pwd').equals(hashed).select('nickname');
		return result;
	},
}

//https://im-developer.tistory.com/167
//https://darrengwon.tistory.com/332

module.exports=userController;
