// Routes for user authentication

const express = require("express");
const router = express.Router();


router.get('/', (req, res, next) => {
    //Here should be test, is user logged in, if no then redirect to loging, else show profile
    res.send('Home page');
})

router.get('/profile', (req, res, next) => {
    res.send('My profile');
})

router.get('/profile/:id', (req, res, next) => {
    res.send('profile with id');
})

module.exports = router;