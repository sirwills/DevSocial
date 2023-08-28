const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config()
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
       const decoded = jwt.verify(token, JWT_SECRET)
       req.user = decoded.user
       next();
   } catch (error) {
       res.status(401).json({msg: 'Token is not valid'})
   }
}

module.exports = verifyToken; 