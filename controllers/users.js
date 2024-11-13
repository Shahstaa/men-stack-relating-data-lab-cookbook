const express = require('express');
const router = express.Router();

const User = require('../models/user');

router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.render('users/index.ejs', { 
            users : users,
        } );
    } catch (err) {
        console.log(error);
        res.redirect('/')
    }
});

router.get('/:userId', async (req, res) => {
    try {
        const users = await User.findById(req.params.userId);
        res.render('users/show.ejs', { 
            users : users, 
        });
    } catch (err) {
        console.log(error);
        res.redirect('/')
    }
});


module.exports = router;