const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Index route (View pantry items)
router.get('/', async (req, res) => {
  try {
    if (!req.session.user) {
      return res.redirect('/auth/sign-in');
    }
    const currentUser = await User.findById(req.session.user._id);
    if (!currentUser) {
      return res.redirect('/');
    }
    res.render('foods/index.ejs', {
      pantry: currentUser.pantry,
    });
  } catch (error) {
    console.log('Error fetching pantry:', error);
    res.redirect('/');
  }
});

// New route (Render form to add new item)
router.get('/new', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/auth/sign-in');
  }
  res.render('foods/new.ejs');
});

// Create route (Add new item to pantry)
router.post('/', async (req, res) => {
  try {
    if (!req.session.user) {
      return res.redirect('/auth/sign-in');
    }
    const currentUser = await User.findById(req.session.user._id);
    if (!currentUser) {
      return res.redirect('/');
    }
    req.body.date = new Date(req.body.date || Date.now()); // Set date if not provided
    currentUser.pantry.push(req.body);
    await currentUser.save();
    res.redirect(`/users/${currentUser._id}/foods`);
  } catch (error) {
    console.log('Error adding item to pantry:', error);
    res.redirect('/users');
  }
});

// Show individual pantry item
router.get('/:pantryId', async (req, res) => {
  try {
    if (!req.session.user) {
      return res.redirect('/auth/sign-in');
    }
    const currentUser = await User.findById(req.session.user._id);
    if (!currentUser) {
      return res.redirect('/');
    }
    const pantryItem = currentUser.pantry.id(req.params.pantryId);
    if (!pantryItem) {
      return res.redirect(`/users/${currentUser._id}/foods`);
    }
    res.render('foods/show.ejs', {
      pantry: pantryItem,
    });
  } catch (error) {
    console.log('Error showing pantry item:', error);
    res.redirect('/');
  }
});

// Delete pantry item
router.delete('/:pantryId', async (req, res) => {
  try {
    if (!req.session.user) {
      return res.redirect('/auth/sign-in');
    }
    const currentUser = await User.findById(req.session.user._id);
    if (!currentUser) {
      return res.redirect('/');
    }
    const pantryItem = currentUser.pantry.id(req.params.pantryId);
    if (pantryItem) {
      pantryItem.deleteOne(); // Delete pantry item
      await currentUser.save();
    }
    res.redirect(`/users/${currentUser._id}/foods`);
  } catch (error) {
    console.log('Error deleting pantry item:', error);
    res.redirect('/');
  }
});

// Edit pantry item
router.get('/:pantryId/edit', async (req, res) => {
  try {
    if (!req.session.user) {
      return res.redirect('/auth/sign-in');
    }
    const currentUser = await User.findById(req.session.user._id);
    if (!currentUser) {
      return res.redirect('/');
    }
    const pantryItem = currentUser.pantry.id(req.params.pantryId);
    if (!pantryItem) {
      return res.redirect(`/users/${currentUser._id}/foods`);
    }
    res.render('foods/edit.ejs', {
      pantry: pantryItem,
    });
  } catch (error) {
    console.log('Error fetching pantry item for editing:', error);
    res.redirect('/');
  }
});

// Update pantry item
router.put('/:pantryId', async (req, res) => {
  try {
    if (!req.session.user) {
      return res.redirect('/auth/sign-in');
    }
    const currentUser = await User.findById(req.session.user._id);
    if (!currentUser) {
      return res.redirect('/');
    }
    const pantryItem = currentUser.pantry.id(req.params.pantryId);
    if (pantryItem) {
      pantryItem.set(req.body); // Update pantry item fields
      await currentUser.save();
    }
    res.redirect(`/users/${currentUser._id}/foods/${req.params.pantryId}`);
  } catch (error) {
    console.log('Error updating pantry item:', error);
    res.redirect('/');
  }
});

module.exports = router;