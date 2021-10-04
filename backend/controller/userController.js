const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET_KEY = process.env.SECRET_KEY;
//const SECRET_KEY = "NewsmoaKey";
//https://velog.io/@jongsunpark88/fetch.-%EC%84%9C%EB%B2%84%EC%99%80%EC%9D%98-%EB%8D%B0%EC%9D%B4%ED%84%B0%EB%A5%BC-%ED%86%B5%EC%8B%A0%ED%95%98%EA%B8%B0-%EC%9C%84%ED%95%9C-%ED%95%A8%EC%88%98-%EA%B7%B8%EB%A6%AC%EA%B3%A0-HTTP

const userController = {
	createToken : async (req, res, next) => {
		try {
			//참고
			//console.log("토큰 발행", req.body)
			const user = await userModel.find(req.body);
			//console.log(user,SECRET_KEY)
			//jwt를 이용한 토큰 생성 json 형식을 토큰화하며 1시간 동안 유지되게 설정
			if (user.length) {
				const token = jwt.sign({
					id: user[0].id
				}, SECRET_KEY, {
					expiresIn: '1h'
				});
				//res.cookie('user', token);
				//완료되면 상태코드 전송
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
			//받아온 req.body를 유저 컬렉션에 save 후 상태코드 전송
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
	
	findMyInfo : async(req,res,next)=>{
		//유저 확인 용, 마이페이지 유저 값들을 확인하기 위한 코드
		const result = await userModel.find({id:res.locals.userId},{_id:false});
		//console.log(result[0])
		res.json({
			me:result[0]
		})
	},
	meUpdate : async(req,res,next)=>{
		try{
			const result = await userModel.updateOne(req.body);
			//마이페이지 회원정보 수정에서 변경된 데이터를 updateOne을 통해 변경
			res.sendStatus(201);
		}catch(err){
			res.sendStatus(500).json({ error: error.toString()} );
		}
	},
}

//https://im-developer.tistory.com/167
//https://darrengwon.tistory.com/332

module.exports=userController;
