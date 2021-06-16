const jwt = require('jsonwebtoken');
const YOUR_SECRET_KEY = process.env.SECRET_KEY;
require('dotenv').config();

const verifyToken = (req, res, next) => {
    //console.log(req.headers['x-access-token'])
    try {
        const clientToken = req.headers['x-access-token'];
        //console.log(req.headers,req.body,clientToken)
        const decoded = jwt.verify(clientToken, YOUR_SECRET_KEY);
        //console.log(decoded)
        if (decoded) {
            res.locals.userId = decoded.id;
            next();
        } else {
            res.status(401).json({ error: 'unauthorized' });
        }
    } catch (err) {
        res.status(401).json({ error: 'token expired' });
    }
};

exports.verifyToken = verifyToken;