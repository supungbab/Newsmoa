const express = require('express');
const router = express.Router();
const userController = require('../../controller/userController');
const { verifyToken } = require('../middlewares/authorization');

//유저 생성
router.post("/signup",userController.createUser);

//로그인
router.post("/signin",userController.createToken);

//회원정보
router.get("/me",verifyToken,userController.findMyInfo);


console.log("users done");


module.exports = router;