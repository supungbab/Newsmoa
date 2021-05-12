const express = require('express');
const router = express.Router();
const boardController = require('../../controller/boardController');


router.get('/', function(req, res) {
    res.send('test');
});

router.get('/create', function(req, res) {
    boardController.createBoard(4);
    res.sendStatus(200);
});

router.put('/:index/like',async function(req, res){
    try{
        console.log("Like put 실행",req.params.index);
        let user = "supungbab2";
        let err = await boardController.putLike(req.params.index, user);
        console.log(err);
    } catch(error){
        res.sendStatus(500).json({ error: error.toString()} );
    }
    res.sendStatus(200);
});

router.get('/:index/like',async function(req, res){
    try{
        console.log("Like get 실행",req.params.index);
        let like = await boardController.getLike(req.params.index);
        let likeCount = like[0].likes.length;
        console.log(like, likeCount);
    } catch(error){
        res.sendStatus(500).json({ error: error.toString() });
    }
    res.sendStatus(200);
});

router.put('/:index/comment',async function(req, res){
    try{
        console.log("Comment put 실행",req.params.index);
        let user="supungbab";
        let comment = "hihihello~";
        let idx = "8";
        let err = await boardController.putComment(req.params.index, idx, user, comment);
        console.log(err);
    } catch(error){
        res.sendStatus(500).json({ error: error.toString()} );
    }
    res.sendStatus(200);
})

router.get('/:index/comment',async function(req, res){
    try{
        console.log("Comment get 실행",req.params.index);
        let comment = await boardController.getComment(req.params.index);
        let commentCount = comment[0].comments.length;
        console.log(comment,commentCount);
    } catch(error){
        res.sendStatus(500).json({ error: error.toString() });
    }
    res.sendStatus(200);
})

router.delete('/:index/comment',async function(req, res){
    try{
        console.log("Comment delete 실행",req.params.index);
        let user="supungbab";
        let idx = "7"; // 고유 댓글 값 Vue에서 받아올것.
        let err = await boardController.deleteComment(req.params.index, idx, user);
        console.log(err);
    } catch(error){
        res.sendStatus(500).json({ error: error.toString()} );
    }
    res.sendStatus(200);
})

console.log("boards done");

module.exports = router;