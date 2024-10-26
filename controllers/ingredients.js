const express = require('express');
const Ingredient = require('../models/ingredient');
const router = express.Router();

// Index and Create
router.get('/', async (req, res) => {
    const ingredients = await Ingredient.find();
    res.render('ingredients/index.ejs', { ingredients });
});

// Create Ingredient
router.post('/', async (req, res) => {
    const newIngredient = new Ingredient(req.body);
    await newIngredient.save();
    res.redirect('/ingredients');
});

module.exports = router;


