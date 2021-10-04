const jwt = require('jsonwebtoken');
const YOUR_SECRET_KEY = process.env.SECRET_KEY;
require('dotenv').config();

const verifyToken = (req, res, next) => {
    console.log("보안 JWT 토큰 실행")
    try {
        const clientToken = req.headers['x-access-token'];
        //헤더에 토큰 정보 저장
        //console.log(req.headers,req.body,clientToken)
        const decoded = jwt.verify(clientToken, YOUR_SECRET_KEY);
        //토큰 정보를 토대로 시크릿키로 복호화
        //console.log(decoded)
        if (decoded) {
            res.locals.userId = decoded.id; // 복호화한 아이디 다음 컨트롤러로 전송
            next();
        } else {
            res.status(401).json({ error: 'unauthorized' }); // 오류 코드
        }
    } catch (err) {
        res.status(401).json({ error: 'token expired' }); // 토큰 미확인 오류
    }
};

exports.verifyToken = verifyToken;