const boardModel = require('../models/boardModel');

//https://velopert.com/545 insert 배열 관련

const boardController = {
	createBoard : async (index)=>{
		const result = await boardModel.create({
			index:index,
			likes:[],
			comments:[]
		});
		
		return result;
	},
	putLike : async (req, res)=>{
		try{
			console.log("Like put 실행",req.params.index);
			const result = await boardModel.updateOne({index : req.params.index},{
				$addToSet:{likes:res.locals.userId}
			});
			res.sendStatus(200);
		} catch(error){
			res.sendStatus(500).json({ error: error.toString()} );
		}
	},

	getLike : async (req, res)=>{
		try{
			console.log("Like get 실행",req.params.index);
			let like = await boardModel.find({index:req.params.index},{_id:false, likes:true});
			let likeCount = like[0].likes.length;
			console.log(like, likeCount);
			res.json({
				like:like[0].likes,
				likeCount:likeCount
			})
		} catch(error){
			res.sendStatus(500).json({ error: error.toString() });
		}
	},

	putComment : async (req, res) =>{
		try{
			/*
			put json 형식
			{
				"idx" : 댓글 고유값,
				"user" : 유저명,
				"commnet" : 댓글 내용
			}
			*/
			console.log("Comment put 실행",req.params.index);
			req.body.date = new Date().toString();
			console.log(req.body)
			const result = await boardModel.updateOne({index : req.params.index},{
				$push: { comments: req.body }
			})
			res.sendStatus(200);
		} catch(error){
			res.sendStatus(500).json({ error: error.toString()} );
		}
	},

	getComment : async (req, res)=>{
		try{
			console.log("Comment get 실행",req.params.index);
			let comment = await boardModel.find({index:req.params.index},{comments:true});
			let commentCount = comment[0].comments.length;
			console.log(comment[0].comments,commentCount);
			res.json({
				comment:comment[0].comments,
				commentCount:commentCount
			})
		} catch(error){
			res.sendStatus(500).json({ error: error.toString() });
		}
	},

	deleteComment : async (req, res)=>{
		try{
			/*
			delete json 형식
			{
				"idx" : 댓글 고유값,
				"user" : 유저명
			}
			*/
			console.log("Comment delete 실행",req.params.index);
			const result = await boardModel.updateOne({index : req.params.index},{
				$pull: { comments: req.body }
			});
			res.sendStatus(200);
		} catch(error){
			res.sendStatus(500).json({ error: error.toString()} );
		}
	},
	findBoardInfo : async(index)=>{
		const result = await boardModel.find().where('index').equals(index);
		return result;
	},
}

module.exports=boardController;

//https://www.daleseo.com/js-window-fetch/