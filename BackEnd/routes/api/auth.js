const router = require('express').Router();
const auth = require('../../midleware/auth');
const User = require('../../models/User');
const {check, validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;
const bcrypt = require('bcryptjs')
// @route   Get api/auth
// @desc     test route
// @access  Private

router.get('/', auth, async(req, res) =>{

    try {

        const user = await User.findById(req.user.id).select('-password')
        res.json(user);

    } catch (error) {

        console.error(error.message);
        res.status(500).send("Server Error")
        
    }
    
});


// @route   POST api/auth
// @desc    Authenticate a user & get token 
// @access  Public  

router.post('/',[
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with at least 6 characters').exists('password is required')

], async(req, res)=> {

    const errors = validationResult(req);
    
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }

    const { email, username, password} = req.body

    try {
         // check for existing user
        let user = await User.findOne({$or: [{email}, {username}]});
        
        if(!user){
            return res.status(400).json({ errors: [ { msg: 'Invalid user credentials'} ]}) 
        };

     
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(400).json({ errors: [ { msg: 'Invalid user credentials'} ]});
        }
    

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