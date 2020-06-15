const bcryptjs = require('bcryptjs');
const User = require('../models/User.model');
const mongoose = require('mongoose');

const saltRounds = 10;

const loadSignupForm = (req, res) => {
  if(req.session.currentUser) {
    res.redirect('/stocks');
  } else {
    res.render('auth/signup')
  }
}

const createNewUser = async (req, res, next) => {
  try {
    const {username, email, password} = req.body;
    const hasEmptyRequiredField = !username || !email || !password;
      if(hasEmptyRequiredField){
        res.render('auth/signup', {errorMessage: 'Username, email and password are mandatory'})
        return;
    };
    
    const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (!regex.test(password)) {
        res.status(500).render('auth/signup', { errorMessage: 'Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.' });
        return;
    }

    const salt = await bcryptjs.genSalt(saltRounds);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const userSignup = await User.create({username, email, passwordHash: hashedPassword})
    res.redirect('/add');
  } catch(error) {
    if (error instanceof mongoose.Error.ValidationError) {
      res.status(400).render('auth/signup', { errorMessage: error.message });
    } else if(error.code === 11000){
        res.status(400).render('auth/signup', { errorMessage: 'Username or email already in use' });
    } else {
        next(error);
    }
  }
};

const loadLoginForm = (req, res) => {
  if(req.session.currentUser) {
    res.redirect('/stocks');
  } else {
    res.render('auth/login')
  }
}

const userLogin = async (req, res) => {
  try {
    console.log('SESSION ===>', req.session);
    const {email, password} = req.body;
    if(!email || !password){
        res.render('auth/login', {errorMessage: 'Please enter both email and password to login'});
        return;
    }

    const userLogin = await User.findOne({email})
    if(!userLogin){
      res.render('auth/login', {errorMessage: 'Email is not registered. Try another email'});
      return;
    } else if (bcryptjs.compareSync(password, userLogin.passwordHash)) {
        req.session.currentUser = userLogin;
        res.redirect('/stocks');
        return;
    } else {
        res.render('auth/login', {errorMessage: 'Incorrect password'});
        return;
    }
  } catch(error) {
    next(error);
  }
}

const userLogout = (req, res) => {
  req.session.destroy()
  res.redirect('/')
}

module.exports = {
  loadSignupForm,
  createNewUser,
  loadLoginForm,
  userLogin,
  userLogout
}