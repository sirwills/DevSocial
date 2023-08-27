const router = require('express').Router();
const {check, validationResult } = require('express-validator');
const User = require('../../model/User');


//  @route  POST api/users
//  @desc   Resgister user
// access   Public

router.post('/',[
    check('name', 'Name id required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with at least 6 characters').isLength({min:6})

], (req, res)=> {

    const errors = validationResult(req);
    
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }
    
     console.log(req.body)
})


module.exports = router;