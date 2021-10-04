const express = require('express');
const router = express.Router();
const boardController = require('../../controller/boardController');
const { verifyToken } = require('../middlewares/authorization');

//게시글 전체, 게시글 디테일
router.get('/', boardController.getBoards)
router.get('/:index', boardController.getBoardDetail)

//게시글 생성 임시
router.get('/create/:index', function(req, res) {
    boardController.createBoard(req.params.index);
    res.sendStatus(200);
});


//좋아요 입력, 가져오기 api
router.put('/:index/like', verifyToken, boardController.putLike);
router.get('/:index/like', boardController.getLike);
router.get('/:index/likeDetail', boardController.getLikeDetail);
router.get('/likeUser/:user', boardController.getLikeUser);

//댓글 입력, 가져오기 api
router.post('/:index/comment', verifyToken, boardController.postComment);
router.get('/:index/comment', boardController.getComment);
router.get('/:index/commentDetail', boardController.getCommentDetail);
router.get('/commentUser/:user', boardController.getCommentUser);

//댓글 삭제 api
router.delete('/:index/comment', verifyToken, boardController.deleteComment);

console.log("boards done");

module.exports = router;