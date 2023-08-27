const router = require('express').Router();
const User = require('../../model/User');

router.get('/', [], (req, res)=> {
    return console.log('Posts route')
     
})


module.exports = router;