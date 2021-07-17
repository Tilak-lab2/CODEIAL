const nodemailer=require("nodemailer")
const { user } = require("../config/mongoose")
const { transporter } = require("../config/nodemailer")
module.exports.Resetemail=async(email,token)=>{
 var url="http://localhost:8000"
}
module.exports.Verifyemail=async(email,token)=>{
    var url="http://localhost:8000/users/verifyemail?token"+token
    console.log(url)
    await transporter.sendMail({
        from:"ssritilak@gmail.com",
        to:user.email,
        subject:"Verification Email",
        text:`<h3>Click on this to verify:${url}</h3>`

    })
}
