const router = require('express').Router();
const User = require('../../model/User');

router.get('/', [], (req, res)=> {
    return console.log('Profile route')
     
})


module.exports = router;