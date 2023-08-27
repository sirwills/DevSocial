const router = require('express').Router();
const {check, validationResult } = require('express-validator');
const User = require('../../model/User');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config()
const JWT_SECRET = process.env.JWT_SECRET



//  @route  POST api/users
//  @desc   Resgister user
// access   Public

router.post('/',[
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with at least 6 characters').isLength({min:6})

], async(req, res)=> {

    const errors = validationResult(req);
    
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }

    const {name, email, username, password} = req.body

    try {
         // check for existing user
        let user = await User.findOne({$or: [{email}, {username}]});
        
        if(user){
            return res.status(400).json({ errors: [ { msg: 'User already exists'} ]})
        }

    // get users gravatar,

    const avatar = gravatar.url(email, {
        size: '200',
        rating: 'pg',
        default: 'mm'
         
    })

    // creating an istance of a user

     user =  new User({
        name, email, username, avatar, password
     })
    // encrpyt the password using bcrypt
     const salt = await bcrypt.genSalt(10);

     user.password = await bcrypt.hash(password, salt)


    //  saving the user to the database

    await user.save();

    // return token

    const payload = {
        user: {
            id: user.id
        }
    };

    jwt.sign(
        payload, 
        JWT_SECRET, 
        {expiresIn: '45hr'}, 
        (err, token)=>{
             if(err){
                throw err;
             }
             res.json({token});
        });
    
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error')
        
    }
    
    
})


module.exports = router;