const express = require('express')
const router = express.Router();
const {userRegistration, loginUser,logoutUser} = require('../controllers/authControllers')
router.get('/', (req, res) => {
    res.send("hey, everything is working perfectally")
})

//test this route with postman in body -> urlencoded form using post method
router.post('/register',userRegistration)
router.post('/login',loginUser)
router.get('/logout',logoutUser)
module.exports = router;