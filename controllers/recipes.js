const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipe');
const Ingredient = require('../models/ingredient');
const User = require('../models/user');

// Index Route
router.get('/', async (req, res) => {
    const recipes = await Recipe.find({ owner: req.session.user._id });
    res.render('recipes/index.ejs', { recipes });
});

// New Recipe Form
router.get('/new', (req, res) => {
    res.render('recipes/new.ejs');
});

// Create Recipe
router.post('/', async (req, res) => {
    const newRecipe = new Recipe({ ...req.body, owner: req.session.user._id });
    await newRecipe.save();
    res.redirect('/recipes');
});

// Show Recipe
router.get('/:id', async (req, res) => {
    const recipe = await Recipe.findById(req.params.id).populate('ingredients');
    res.render('recipes/show.ejs', { recipe });
});

// Edit Recipe Form
router.get('/:id/edit', async (req, res) => {
    const recipe = await Recipe.findById(req.params.id);
    res.render('recipes/edit.ejs', { recipe });
});

// Update Recipe
router.put('/:id', async (req, res) => {
    await Recipe.findByIdAndUpdate(req.params.id, req.body);
    res.redirect(`/recipes/${req.params.id}`);
});

// Delete Recipe
router.delete('/:id', async (req, res) => {
    await Recipe.findByIdAndDelete(req.params.id);
    res.redirect('/recipes');
});

module.exports = router;
