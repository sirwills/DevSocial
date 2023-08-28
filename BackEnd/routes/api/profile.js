const router = require('express').Router();
const User = require('../../models/User');
const auth = require('../../midleware/auth')
const Profile = require('../../models/Profile')



// @route   GET api/profile/me
// @desc    Get current user's profile
// @access  private
router.get('/me', auth, async(req, res)=> {

    try {
        const profile = await Profile.findOne({user: req.user.id}).populate('user', ['name', 'avatar']);

        if(!profile){
            return res.status(400).json({msg: 'There is no profile for this user '})
        }
        res.json(profile)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error')
    }
    
     
});


// @route   Get api/profile
// @desc   Get all users profile
// @acess   Public

router.get('/', async(req, res)=>{
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar'])
        res.json(profiles)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error')
    }
});

router.post('/me', auth, async(req, res)=>{

    const {location, hobbies, occupation, bio,} = req.body
    try {
        let profile = await Profile.findOne({user: req.user.id});
        if(profile){
            res.status(400).json({msg: 'This already a profile for this user'})
        }
       profile = new Profile({
        user: req.user.id,
        location, hobbies, occupation, bio
       })  

       await profile.save()
       res.status(200).json(profile)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error')
    }
})


module.exports = router;