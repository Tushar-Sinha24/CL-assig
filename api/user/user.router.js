const {createUser ,loginUser , logout} = require('./user.controller');
const router = require('express').Router(); 

router.post('/register' , createUser);
router.post("/login", loginUser);
router.get('/logout', logout);


module.exports = router;
