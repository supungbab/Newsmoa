const express = require('express');
const router = express.Router();
const boardController = require('../../controller/boardController');
const { verifyToken } = require('../middlewares/authorization');

router.get('/', function(req, res) {
    res.send('test');
});

//게시글 생성 임시
router.get('/create', function(req, res) {
    boardController.createBoard(4);
    res.sendStatus(200);
});

//좋아요 입력, 가져오기 api
router.put('/:index/like', boardController.putLike);
router.get('/:index/like', boardController.getLike);

//댓글 입력, 가져오기 api
router.put('/:index/comment', boardController.putComment);
router.get('/:index/comment', boardController.getComment);

//댓글 삭제 api
router.delete('/:index/comment',boardController.deleteComment);

console.log("boards done");

module.exports = router;