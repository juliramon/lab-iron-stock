const express = require('express');
const {
  loadSignupForm, 
  createNewUser,
  loadLoginForm,
  userLogin,
  userLogout
} = require('../controllers/auth.controllers');

const router  = express.Router();

router
  .get('/signup', loadSignupForm)
  .post('/signup', createNewUser)
  .get('/login', loadLoginForm)
  .post('/login', userLogin)
  .post('/logout', userLogout)

module.exports = router;