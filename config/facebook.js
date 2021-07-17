const FacebookStrategy = require('passport-facebook').Strategy;
const User=require("../models/user")
const crypto=require("crypto")
const passport=require("passport")

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
passport.use(new FacebookStrategy({
    clientID: "1092352561257334" ,
    clientSecret:"9236c513a1d5f9585ec71356abdf4c47" ,
    callbackURL:"http://localhost:8000/users/auth/facebook/callback",
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
         console.log(user)
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
module.exports=passport