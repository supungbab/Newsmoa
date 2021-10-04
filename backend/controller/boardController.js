const boardModel = require('../models/boardModel');
const userModel = require('../models/userModel');
const commentModel = require('../models/commentModel');
const likeModel = require('../models/likeModel');
const badwords = require('../curseData/badword')
//https://velopert.com/545 insert 배열 관련
//https://wooooooak.github.io/web/2018/11/10/req.params-vs-req.query/ 파라미터, 쿼리 받아오는 방법

const curseDistinction = (data)=>{
	const words = data.split(' ');
	let result = 0;
	words.forEach(word=>{
		for(let i=0;i<word.length;i++){
			if(badwords.indexOf(word.substr(0,i+1))!=-1){
				result = 1;
				console.log("감지!")
				break;
			}
		}
	})
	return result;
}

const boardController = {
	getBoards : async (req,res) =>{
		try{
			console.log("Boards get 실행",req.query);
			let boards;
			//카테고리가 선택되지 않았거나 null 값이면 게시글 전부 로드 아니면 해당 카테고리 로드
			if(req.query.category==''||req.query.category==null)
				boards = await boardModel.find({},{_id:false}).sort({index:-1});
			else
				boards = await boardModel.find({category:req.query.category},{_id:false}).sort({index:-1});
			//console.log(boards);
			//몽고db에서 받아온 데이터 json 형식으로 전송
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
			//파라미터에서 index 값을 불러와 몽고db에서 해당 index 값을 가진 게시글 로드
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
			console.log("Like put 실행",req.params.index);
			//좋아요 컬렉션에서 해당 index값과 유저명을 검색
			//하는 이유는 유저가 이 게시글을 좋아요를 눌렀는지 안눌렀는지 알기 위해
			let like = await likeModel.find({index:req.params.index,user:res.locals.userId},{_id:false});
			likeThis = like[0];
			//console.log(likeThis);
			//해당 값이 없을 시 데이터 추가 없을 시 delete
			if(likeThis==undefined){
				//console.log("좋아요 더하기")
				await new likeModel(req.body).save()
			}
			else{
				//console.log("좋아요 빼기")
				await likeModel.deleteOne({index:req.params.index,user:res.locals.userId});
			}
			res.sendStatus(200);
			
		} catch(error){
			res.sendStatus(500).json({ error: error.toString()} );
		}
	},

	getLike : async (req, res)=>{
		try{
			//console.log("Like get 실행",req.params.index);
			let like = await likeModel.find({index:req.params.index},{_id:false});
			let likeCount = like.length;
			//console.log(like, likeCount);
			res.json({
				//like:like,
				likeCount:likeCount
			})
		} catch(error){
			res.json({
				likeCount:0
			})
		}
	},

	getLikeDetail : async (req, res)=>{
		try{
			console.log("getLikeDetail 실행",req.params.index);
			//해당 인덱스 값의 좋아요 컬럼들을 불러온 후 개수를 json 형식으로 전송합니다.
			//만약 해당 값이 없다면 0개를 반환합니다.
			let like = await likeModel.find({index:req.params.index},{_id:false});
			let likeCount = like.length;
			//console.log(like, likeCount);
			res.json({
				likeCount:likeCount
			})
		} catch(error){
			res.json({
				likeCount:0
			})
		}
	},
	getLikeUser : async (req, res)=>{
		try{
			console.log("getLikeUser 실행",req.params.user);
			//마이페이지 용 해당 유저의 좋아요 게시글 찾기용 함수
			//해당 유저의 좋아요 index 컬럼을 저장
			let like = await likeModel.find({user:req.params.user},{_id:false});
			//console.log(like)
			let likeUser=[];
			//그 후 반복문을 이용해 보드 컬렉션에서 해당 index 값을 찾은 후 변수에 추가
			for(let i=0;i<like.length;i++){
				let board = await boardModel.find({index:like[i].index},{_id:false});
				likeUser.push({
					index:like[i].index,
					topimg:board[0].topimg,
					media:board[0].media,
					title:board[0].title,
					date:board[0].date
				})
			}
			//추가한 변수를 전송.
			res.json({
				likeUser:likeUser
			})
		}catch(error){
			res.json({
				likeUser:[]
			})
		}
	},

	postComment : async (req, res) =>{
		try{
			/*
			put json 형식
			{
				author : {type:mongoose.Schema.Types.ObjectId, ref:'user', required : true},
				index : Number,
				user : String,
				comment : {type : String, required : true},
				createdAt: {type: Date, default: Date.now}
			}
			*/
			console.log("Comment put 실행",req.params.index);
			if(curseDistinction(req.body.comment)){
				res.status(201).json({
					result: 'curse'
				});
				return;
			}
			const result = await new commentModel(req.body).save()
			res.status(201).json({
				result: 'ok'
			});
			
			//console.log(req.body)
			//코멘트 컬럼에 전송받은 json 데이터 save
			//보안은 미들웨어를 통해 해결
			
		} catch(error){
			res.sendStatus(500).json({ error: error.toString()} );
		}
		return;
	},

	getComment : async (req, res)=>{
		try{
			//console.log("getComment 실행",req.params.index);
			let comment = await commentModel.find({index:req.params.index},{_id:false});
			//해당 index의 댓글 수 로드 후 전송
			let commentCount = comment.length;
			//console.log(comment, commentCount);
			res.json({
				//comments:comment,
				commentCount:commentCount
			})
		} catch(error){
			res.json({
				commentCount:0
			})
		}
	},
	getCommentDetail : async (req, res)=>{
		try{
			console.log("getCommentDetail 실행",req.params.index);
			let comment = await commentModel.find({index:req.params.index},{_id:false});
			let commentCount = comment.length;
			//console.log(comment, commentCount);
			//해당 index의 댓글 수 및 댓글들을 전송
			res.json({
				comments:comment,
				commentCount:commentCount
			})
		} catch(error){
			res.json({
				commentCount:0
			})
		}
	},
	getCommentUser : async (req,res)=>{
		try{
			console.log("getCommentUser 실행",req.params.user);
			//마이페이지 용 해당 유저가 댓글 단 게시글 조회
			let comment = await commentModel.find({user:req.params.user},{_id:false});
			//커멘트 컬렉션에서 해당 유저 조회 후 저장
			let commentUser=[];
			//저장 된 배열안에서 보드 컬렉션에서 index 조회 후 변수에 저장
			for(let i=0;i<comment.length;i++){
				let board = await boardModel.find({index:comment[i].index},{_id:false});
				commentUser.push({
					index:comment[i].index,
					topimg:board[0].topimg,
					title:board[0].title,
					createdAt:comment[i].createdAt,
					comment:comment[i].comment
				})
			}
			//저장된 변수를 전송
			res.json({
				commentUser:commentUser
			})
		}catch(error){
			res.json({
				commentUser:[]
			})
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