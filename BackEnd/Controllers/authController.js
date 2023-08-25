const authController = require('express').Router();
const User = require('../model/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config()
const JWT_SECRET = process.env.JWT_SECRET
const {check, vailaditionResult, validationResult} = require('express-validator')
const gravatar = require('gravatar')


authController.post('/register',[
    check('name', 'Name is required')
    .not()
    .isEmpty(),
    check('email', 'Email is required').isEmail(),
    check('password', 'Password enter as password with atleast 6 characters')
    .isLength({min: 6})
], async (req, res) => {
    try {

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});

        }

        // request and destructure the user information needed for the logic

       const userDetails = req.body;

       const {username, email} = userDetails;

        // check if there's a user associated with the provided credentials

        const userExist = await User.findOne({$or: [{username}, {email}]})

        if(userExist){
            return res.status(400).json({errors: [{msg: 'User already exist'}]})
        }

        // setting avatar for the new user instance that will be created

        const avatar = gravatar.url(email, {
            size: '200',
            rating: 'pg',
            default: 'mm'
        })

        // hashing the password provided

        const hashedPassword = await bcrypt.hash(req.body.password, 10)

        // creating an istance of a new user

        const newUser = await User.create({...req.body, avatar, password: hashedPassword})

        // removing the password so it is not being stored to the database for security reasons
        const {password, ...others} = newUser._doc

        const token = jwt.sign({id: newUser._id}, JWT_SECRET, { expiresIn: '40hr'});

        newUser.token = token

        await newUser.save()

        res.status(200).json({

            user: others,
            token
            
        })
       

        
    } catch (error) {
        console.error(error)
        res.status(500).send('Server error')
    }
})

module.exports = authController;