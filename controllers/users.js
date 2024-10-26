const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const router = express.Router();

// Sign Up
router.get('/sign-up', (req, res) => {
    res.render('users/sign-up.ejs');
});

router.post('/sign-up', async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({ username: req.body.username, password: hashedPassword });
    await newUser.save();
    res.redirect('/auth/sign-in');
});

// Sign In
router.get('/sign-in', (req, res) => {
    res.render('users/sign-in.ejs');
});

router.post('/sign-in', async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    if (user && await bcrypt.compare(req.body.password, user.password)) {
        req.session.user = user;
        res.redirect('/recipes');
    } else {
        res.redirect('/auth/sign-in');
    }
});

// Sign Out
router.post('/sign-out', (req, res) => {
    req.session.destroy();
    res.redirect('/auth/sign-in');
});

module.exports = router;


