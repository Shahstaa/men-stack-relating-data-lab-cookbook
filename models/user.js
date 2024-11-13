const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  cuisine: {
    type: String,
    required: true, // This will now be required in the form
  },
  calories: {
    type: Number,
    required: true, // This will now be required in the form
  },
  ingredients: {
    type: String,
    required: false, // Optional, but can be added in form
  },
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  pantry: [foodSchema], // Array of food items
});

module.exports = mongoose.model('User', userSchema);