const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();
//const SECRET_KEY = process.env.SECRET_KEY;
const SECRET_KEY = "NewsmoaKey";


const userController = {
	createToken : async (req, res, next) => {
		try {
			//https://velog.io/@jongsunpark88/fetch.-%EC%84%9C%EB%B2%84%EC%99%80%EC%9D%98-%EB%8D%B0%EC%9D%B4%ED%84%B0%EB%A5%BC-%ED%86%B5%EC%8B%A0%ED%95%98%EA%B8%B0-%EC%9C%84%ED%95%9C-%ED%95%A8%EC%88%98-%EA%B7%B8%EB%A6%AC%EA%B3%A0-HTTP
			//참고
			console.log("토큰 발행", req.body)
			const user = await userModel.find(req.body);
			console.log(user,SECRET_KEY)
			if (user.length) {
				const token = jwt.sign({
					id: user[0].id
				}, SECRET_KEY, {
					expiresIn: '1h'
				});
				//res.cookie('user', token);
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
			/*
			createUser json 형식
			header : {
				Content-Type : application/json
			},
			유저 생성 {
				"id": "test",
				"pw": "test",
				"nickname": "갱맹",
				"name": "경명호",
				"birth": "1997-11-01",
				"sex": 1,
				"email": "rhtn388@naver.com",
				"address": "부천시 장말로",
				"number": "010-5320-3057"
			}
			*/
			console.log("유저 생성",req.body);
			req.body.fit="";
			req.body.taste=[];
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
}

//https://im-developer.tistory.com/167
//https://darrengwon.tistory.com/332

module.exports=userController;
