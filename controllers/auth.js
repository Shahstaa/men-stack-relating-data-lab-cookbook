const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Sign Up Route
router.get('/sign-up', (req, res) => {
  res.render('auth/sign-up');
});

router.post('/sign-up', async (req, res) => {
  const newUser = new User(req.body);
  await newUser.save();
  req.session.user = newUser; 
  res.redirect('/recipes');
});

// Sign In Route
router.get('/sign-in', (req, res) => {
  res.render('auth/sign-in');
});

router.post('/sign-in', async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (user && user.password === req.body.password) { // Simple password check
    req.session.user = user;
    res.redirect('/recipes');
  } else {
    res.redirect('/auth/sign-in');
  }
});

// Sign Out Route
router.get('/sign-out', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;

