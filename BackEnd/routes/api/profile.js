const router = require('express').Router();
const User = require('../../model/User');

router.get('/', [], (req, res)=> {
    return res.status(200).send('Profile Route')
     
})


module.exports = router;