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


// @route   Get api/profile/user/:user_id
// @desc   Get user profile
// @acess   Public

router.get('/user/:user_id', async(req, res)=>{
    try {
        const profile = await Profile.findOne({user: req.params.user_id}).populate('user', ['name', 'avatar'])

        if(!profile){
            return res.status(404).json({msge: 'Profile not found'})
        }
        res.json(profile)
    } catch (error) {
        console.error(error.message)
        if(error.kind == 'ObjectId'){
            return res.status(404).json({msge: 'Profile not found'})
        }
        res.status(500).send('Server Error')
    }
});


// @route   POST api/profile/me
// @desc    Create profile for a logged in user
// @acess   Private

router.post('/me', auth, async(req, res)=>{

    const {location, hobbies, occupation, bio,} = req.body
    try {
        let profile = await Profile.findOne({user: req.user.id});
        if(profile){
            res.status(400).json({msg: 'This already a profile for this user', profile})
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
});



// @route   PUT api/profile/me
// @desc    Upate profile of a logged in user
// @acess   Private

router.put('/me', auth, async(req, res)=>{
    const {location, hobbies, occupation, bio} = req.body;

    try {
        let profile = await Profile.findOne({user: req.user.id});

        if(!profile){
            return res.status(404).json({msg: "Profile not found"});
        }

        profile.location = location;
        profile.hobbies = hobbies;
        profile.occupation = occupation;
        profile.bio = bio;

        await profile.save();

        res.status(200).json(profile)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error')
        
    }
})


// @route   DELETE api/profile
// @desc    Delete a users profile user and post
// @access  Private

router.delete('/', auth, async(req, res)=>{
    try {
        // todo remove user post
        // Remove profile
        await Profile.findOneAndRemove({user: req.user.id})

        // Removes the user
        await User.findOneAndRemove({_id: req.user.id})
        res.json({msg: 'User removed'})
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error')
    }
});

module.exports = router;