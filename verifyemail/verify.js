const nodemailer=require("nodemailer")


exports.newComment=(comment)=>{
    console.log('inside new email mailer')
    let htmlStrings=nodemailer.renderTemplate({comment:comment},'/comments/newcomments.ejs')
    nodemailer.transporter.sendMail({
        from:'ssritilak@gmail.com',
        to:comment.user.email,
        subject:"New Comment Published",
        html:  htmlStrings
    },(err,info)=>{
        if(err){
            console.log("error in sending mail")
            return
        }
        console.log("Message Sent",info)
        return
    })
}



