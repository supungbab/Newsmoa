const express = require('express');
const router = express.Router();
const userModel = require('../../models/userModel');


router.post("/signin",(req,res) => {
    console.log(req.body);
    res.sendStatus(200);
})

console.log("users done");


module.exports = router;