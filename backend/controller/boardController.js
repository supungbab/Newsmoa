const boardModel = require('../models/boardModel');

//https://velopert.com/545 insert 배열 관련

const boardController = {
	getBoards : async (req,res) =>{
		try{
			//console.log("Boards get 실행");
			let boards = await boardModel.find({},{_id:false});
			//console.log(boards);
			res.json({
				boards:boards
			})
		} catch(err){
			res.sendStatus(500).json({ error: error.toString() });
		}
	},
	getBoardDetail : async (req,res) =>{
		try{
			console.log("getBoardDetail 실행", req.params.index);
			let board = await boardModel.find({index:req.params.index},{_id:false});
			//console.log(board);
			res.json({
				board:board[0]
			})
		} catch(err){
			res.sendStatus(500).json({ error: error.toString() });
		}
	},
	createBoard : async (index)=>{
		const result = await boardModel.create({
			index : index,
			topimg : "https://imgnews.pstatic.net/image/origin/052/2021/05/21/1590737.jpg?type=nf132_90",
			category : "it",
			media : "naver",
			title : index+"번 뉴스입니다.",
			summary : index+"번 뉴스가 요약입니다.",
			date : new Date(),
			content : "여기는 "+index+"번 뉴스입니다. 뉴스 어쩌구 샬라샬라 비비디바비디부~",
			hits : 0,
			comments : [],
			likes: []
		});
		
		return result;
	},
	putLike : async (req, res)=>{
		try{
			//req.body.id 이거 바꾸기 = > res.locals.userId
			console.log("Like put 실행",req.params.index);
			let like = await boardModel.find({index:req.params.index},{_id:false, likes:true});
			like = like[0].likes;
			console.log(like,like.indexOf(req.body.id)) //테스트용 입니다.
			if(like.indexOf(req.body.id)==-1){
				const result = await boardModel.updateOne({index : req.params.index},{
					$addToSet:{likes:req.body.id} //테스트용 입니다.
					//$addToSet:{likes:res.locals.userId}
				});
			}
			else{
				console.log("성공?");
				const result = await boardModel.updateOne({index : req.params.index},{
					$pull:{likes:req.body.id} //테스트용 입니다.
					//$pull:{likes:res.locals.userId}
				});
			}
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