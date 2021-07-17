const express = require('express');
const router = express.Router();
const mongoose=require("../config/mongoose")
const passport = require('passport');
const crypto=require('crypto')
const mailer=require("../controllers/send_verifyeamil")

const usersController = require('../controllers/users_controller');
const User=require("../models/user");
const { transporter } = require('../config/nodemailer');
const { user } = require('../config/mongoose');
const friendship_controller=require("../controllers/friendship_controller")
const reset_password_enter_email_router=require('./reset_password_enter_email');
router.get('/profile/:id', passport.checkAuthentication, usersController.profile);
router.post('/update/:id', passport.checkAuthentication, usersController.update);
router.get('/profiel/:id',passport.checkAuthentication,usersController.profiel)
router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.signIn);
router.post('/update1/:id', passport.checkAuthentication, usersController.update1);
router.post('/create', usersController.create);
router.get ('/profile/:id/toggle_friend',friendship_controller.toggle_friendship);
// use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
), usersController.createSession);


router.get('/sign-out', usersController.destroySession);
router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}))
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/users/sign-in'}),usersController.createSession)

router.get('/auth/github',
  passport.authenticate('github'));

router.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/users/user_sign_up' }),usersController.createSession),
router.get('/auth/facebook',passport.authenticate('facebook'))
router.get('/auth/facebook/callback',passport.authenticate('facebook',{failureRedirect:'/users/sign-in'}),usersController.createSession)
module.exports = router;