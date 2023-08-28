const router = require('express').Router();
const User = require('../../models/User');
const {check, validationResult} = require('express-validator');
const auth = require('../../midleware/auth');
const Post = require('../../models/Posts')
const Profile = require('../../models/Profile')



// @route   POST api/post 
// @route   POST api/post 
// @access  Private

router.post('/', [auth, [
    check('text', 'Text is required').not().isEmpty()
]], async (req, res)=> {
    
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    try {
        
        const user = await User.findById(req.user.id).select('-password ');

    const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
    });

    const post = newPost.save();

    res.status(200).json(newPost)

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error')
    }

})


module.exports = router;