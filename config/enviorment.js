const fs=require('fs');
const rfs=require('rotating-file-stream');
const path=require('path');

const log_directory=path.join(__dirname, '../production_logs');
fs.existsSync(log_directory)||fs.mkdirSync(log_directory);

const accessLogStream=rfs.createStream('access.log', {
    interval:'1d',
    path:log_directory,
});
const development ={
    asset_path:'./assets',
    session_cookie_key:"blahsomething",
    db:'codeial_gunnu2',
    smtp:{
        service:'gmail',
        host:'smtp.gmail.com',
        port:587,
        secure:false,
        auth:{
            user:"ssritilak@gmail.com",
            pass:"ybdwpoxzpzyghqco",
        },
        tls: {
            rejectUnauthorized: false
        }
},
google_client_id:"231408701604-drt0mmq6dnauqoqhid6psfb423rdtaih.apps.googleusercontent.com",
google_client_Secret:"2Y5VnRoDGTxjnnzvBa8njsF5",
google_callback_URL:"http://localhost:8000/users/auth/google/callback",
jwtkey_secret:'CODEIAL',
morgan:{
    mode:'dev',
    options:{stream:accessLogStream}
}
}
const production={
    name:'production',
    asset_path:process.env.CODEIAL_ASSET_PATH,
    session_cookie_key:process.env.CODEIAL_SESSION_COOKIE_KEY,
    db:'codeial_gunnu2',
    smtp:{
        service:'gmail',
        host:'smtp.gmail.com',
        port:587,
        secure:false,
        auth:{
            user:process.env.codeial_gmail_user_name,
            pass:process.env.codeial_gmail_password,
        },
       
},
google_client_id:process.env.CODEIAL_GOOGLE_CLIENT_ID,
google_client_Secret:process.env.CODEIAL_GOOGLE_CLIENT_SECRET,
google_callback_URL:process.envCODEIAL_GOOGLE_CLIENT_CALLBACK_URL,
jwtkey_secret:process.env.CODEIAL_JWT_SECRET,
morgan:{
    mode:'combined',
    options:{stream:accessLogStream}
}
}

module.exports=eval(process.env.CODEIAL_ENV)==undefined ? development:eval(process.env.CODEIAL_DEVELOPMENT);