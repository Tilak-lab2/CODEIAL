//const { user, name } = require('../config/mongoose');
const User = require('../models/user');
const fs =require('fs');
const path =require('path');
const jwt=require("jsonwebtoken");
const { user } = require('../config/mongoose');
const crypto=require("crypto");
const { transporter } = require('../config/nodemailer');
// let's keep it same as before
module.exports.profile = function(req, res){
    User.findById(req.params.id, function(err, user){
        return res.render('user_profile', {
            title: 'User Profile',
            profile_user: user
        });
    });
    
} 


module.exports.update =async function(req, res) {
    try{
        if(req.user.id == req.params.id){
            let user= await  User.findById(req.params.id); 
            User.uploadedAvatar(req,res,(err)=>{
                if(err){
                    console.log("Multer errror",err)
                }
                console.log(req.file)
                // user.name=req.body.name;  
                // user.email=req.body.email;
                if(req.file){
                    if(user.avatar)
                    {
                       // fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                       user.avatar=User.avatarPath+ '/' +req.file.filename;
                    }
                    //  fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                  
                }
              
                
                user.save()
                return res.redirect('back');
            })
            
        }else{
            req.flash('error', 'Unauthorized!');
            return res.status(401).send('Unauthorized');
        }
    }catch(err){
        req.flash ('error',err)
        return res.redirect('back')
    }
}


// render the sign up page
module.exports.signUp = function(req, res){
    if (req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    
    
    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    })
}


// render the sign in page
module.exports.signIn = function(req, res){
    
    if (req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    })
}

// get the sign up data
module.exports.create = function(req, res){
    if (req.body.password != req.body.confirm_password){
        req.flash('error', 'Passwords do not match');
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){req.flash('error', err); return}

        if (!user){
            User.create(req.body, function(err, user){
                if(err){req.flash('error', err); return}

                return res.redirect('/users/sign-in');
            })
        }else{
            req.flash('success', 'You have signed up, login to continue!');
            return res.redirect('back');
        }

    });
}



// sign in and create a session for the user
module.exports.createSession = function(req, res){
     console.log(req.body)
    req.flash('success', 'Logged in Successfully');
    return res.redirect('/');
}

module.exports.destroySession = function(req, res){
    req.logout();
    req.flash('success', 'You have logged out!');
    
    
    return res.redirect('/');
}
module.exports.profiel=(req,res)=>{
  
    res.render("profiel",{title:"Profile || CODEIAL",message:req.flash("success","WELCOME")})
}





module.exports.update1 =async function(req, res){
    
    
    if(req.user.id == req.params.id){
        try{
            let user= await  User.findById(req.params.id); 
            User.uploadedAvatar(req,res,(err)=>{
                if(err){
                    console.log("Multer errror",err)
                }
                user.name=req.body.name;  
                user.email=req.body.email;
                if(req.file){
                    if(user.avatar)
                    {
                        fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                    }
                    user.avatar=User.avatarPath+ '/' +req.file.filename;
                    
                }
                user.save()
                return res.redirect('back');
            })
            
            
        }catch(err){
            req.flash ('error',err)
            return res.redirect('back')
        }
        
        
        
    }else{
        req.flash('error', 'Unauthorized!');
        return res.status(401).send('Unauthorized');
    }
}