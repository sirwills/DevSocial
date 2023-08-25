 const jwt = require('jsonwebtoken')
 const dotenv = require('dotenv').congfig()
 const JWT_SECRET = process.env.JWT_SECRET

 const verifyToken = (req, res, next) => {
    // Get the token from the header

    const token = req.header('x-auth-token');

    // check if there is no token in the header
    if(!token) {
        return res.status(401).json({msg: 'No token, authorization denied'});
    }

    // verify token

    try {
        const decode = jwt.verify(token, JWT_SECRET)
    } catch (error) {
        
    }
 }