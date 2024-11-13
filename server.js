const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const methodOverride = require('method-override');
const app = express();

const authController = require('./controllers/auth');
const foodsController = require('./controllers/foods');
const isSignedIn = require('./middleware/is-signed-in');
const passUserToView = require('./middleware/pass-user-to-view');

mongoose.connect('mongodb://localhost:27017/cookbook', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(session({ secret: 'cookbook', resave: false, saveUninitialized: false }));

app.use(passUserToView); // Ensure this comes before routes

// Routes
app.use('/auth', authController);
app.use('/users/:userId/foods', isSignedIn, foodsController);

app.listen(3000, () => {
  console.log('Cookbook app is running on http://localhost:3000');
});
