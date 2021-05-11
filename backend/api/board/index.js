const express = require('express');
const router = express.Router();
const boardController = require('../../controller/boardController');


router.get('/', function(req, res) {
    res.send('test');
});

router.get('/create', function(req, res) {
    boardController.createBoard(3);
    res.sendStatus(200);
});


console.log("boards done");

module.exports = router;