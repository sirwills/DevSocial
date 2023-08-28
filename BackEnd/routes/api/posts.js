const router = require('express').Router();
const User = require('../../models/User');

router.get('/', [], (req, res)=> {
    return res.status(200).send('Post routes')
     
})


module.exports = router;