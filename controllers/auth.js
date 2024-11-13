const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

// Sign-up route
router.get('/sign-up', (req, res) => {
  res.render('auth/sign-up.ejs');
});

router.post('/sign-up', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();
    res.redirect('/auth/sign-in.ejs');
  } catch (error) {
    console.log(error);
    res.redirect('/auth/sign-up.ejs');
  }
});

// Sign-in route
router.get('/sign-in', (req, res) => {
  res.render('auth/sign-in.ejs');
});

router.post('/sign-in', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (user && await user.checkPassword(password)) {
      req.session.user = user;
      res.redirect(`/users/${user._id}/foods`);
    } else {
      res.redirect('/auth/sign-in.ejs');
    }
  } catch (error) {
    console.log(error);
    res.redirect('/auth/sign-in.ejs');
  }
});

// Sign-out route
router.get('/sign-out', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

module.exports = router;
