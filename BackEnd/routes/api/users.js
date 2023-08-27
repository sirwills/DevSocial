const router = require('express').Router();
const User = require('../../model/User');

router.get('/register', [], (req, res)=> {
    return res.status(200).send("Registration route")
     
})


module.exports = router;