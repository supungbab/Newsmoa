const express = require('express')
const bodyParser = require('body-parser');
//const testIndex = require('./index.js');
const user = require('./api/user/index.js');
const board = require('./api/board/index.js');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost:27017/newsmoa');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
    console.log("mongo db connection OK.");
});


//app.use('/',testIndex);
app.use('/users',user);
app.use('/boards',board);


// 3000 포트로 서버 오픈
app.listen(port, function() {
    console.log(`start! Newsmoa server on port ${port}`)
})

