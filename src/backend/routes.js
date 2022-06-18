const express = require('express')
const passport = require("passport")
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('./Database/dataBaseSchema')

function ensureAuth(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('error', 'Please login to view this resource');
    res.redirect('signin')
}


router.route('/').get(function home(req, res) {
    res.render('index', { user: req.user || 'undefined' })
})

router.route('/signin').get(function login(req, res) {
    res.render('signin')
})

router.route('/calendar').get(ensureAuth, function calendar(req, res) {
    res.render('calendar', { user: req.user || 'undefined' })
})

router.route('/logout').get(ensureAuth, function logout(req, res) {
    req.logout(function (err) {
        if (err) { return next(err); }
        req.flash('error', 'You are logged out!');
        res.redirect('signin');
    });
})

// POST ROutes

router.route('/signin').post(function signin(req, res, next) {
    passport.authenticate('local', {
        // Authentication Passed 
        successRedirect: '/',
        // Authentication Failed
        failureRedirect: '/signin',
        // Authentication Failed Message
        failureFlash: true
    })(req, res, next);

})

router.route('/signup').post(async function signup(req, res) {
    const { name, email, password } = req.body
    const newEmail = email.toLowerCase();
    // Check if email is already present in the data base ....
    console.log('Entered Name ', name)
    console.log('Entered Email ', newEmail)
    console.log('Entered Password ', password)
    const user = await User.findOne({ email: newEmail });
    if (user) {
        console.log('User Found', user)
    }
    else {
        hashedPassword = await bcrypt.hash(password, 10);
        const newuser = new User({
            name,
            email: newEmail,
            password: hashedPassword
        })
        newuser.save().then(user => {
            req.flash('error', 'You are now registered, Please login!!');
            res.redirect('SignIn')
        })
            .catch(err => console.log(err))
    }
})

module.exports = router;