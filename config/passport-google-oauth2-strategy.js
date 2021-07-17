const passport=require("passport")
const googleStrategy=require("passport-google-oauth").OAuth2Strategy
const crypto=require("crypto")
const User=require("../models/user")
const env=require("../config/enviorment")

//tell passport to use new strategy
passport.use(new googleStrategy({
    clientID:process.env.CODEIAL_GOOGLE_CLIENT_ID,
    clientSecret:process.env.CODEIAL_GOOGLE_SECRET,
    callbackURL:process.env.CODEIAL_GOOGLE_CALLBACK,


},(accessToken,refreshToken,profile,done)=>{
    User.findOne({email:profile.emails[0].value}).exec((err,user)=>{
        if(err){
            console.log("err",err)
            return
        }
       console.log(profile)
       if(user){
           //find user
           return done(null,user)
       }else{
           User.create({
               name:profile.displayName,
               email:profile.emails[0].value,
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

))
module.exports=passport