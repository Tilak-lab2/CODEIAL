var GitHubStrategy = require('passport-github').Strategy;
const User=require("../models/user")
const crypto=require("crypto")
const passport=require("passport")
const env=require("../config/enviorment")
const express=require("express")
const app=express()
app.use(passport.initialize())
app.use(passport.session())
passport.serializeUser((user,cb)=>{
    cb(null,user.id)
})
passport.deserializeUser((id,cb)=>{
    cb(null,id)
})
passport.use(new GitHubStrategy({
    clientID: process.env.CODEIAL_GITHUB_CLIENT_ID ,
    clientSecret: process.env.CODEIAL_GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CODEIAL_GITHUB_CALLBACK,
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(profile) ;
    User.findOne({email:profile.profileUrl}).exec((err,user)=>{
      if(err){
          console.log("err",err)
          return
      }
     //console.log(profile)
     if(user){
         //find user
         return done(null,user)
     }else{
         User.create({
             name:profile.displayName,
             email:profile.profileUrl,
             password:crypto.randomBytes(20).toString('hex'),
         },(err,user)=>{
             if(err){
                 console.log("err in creating user")
                 return
             }
             return done(null,user)
         })
     }
  })

    
  }
));