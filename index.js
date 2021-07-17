const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
require("./config/view-helper")(app)
const port = 8000;
const logger = require('morgan');
const upload=require("express-fileupload")
const env=require("./config/enviorment")

const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportjwt=require("./config/passport-jwt-strategy")
const passportGoogle=require("./config/passport-google-oauth2-strategy")
const passportFacebook=require("./config/facebook")
const passportGithub=require("./config/github")
const MongoStore = require('connect-mongo')(session);
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMware = require('./config/middleware');
const JWT_SECRET="super secret"
const chatServer=require('http').Server(app)
const chatSockets=require('./config/chatSockets').chatSockets(chatServer)
chatServer.listen(5000)
console.log("listening on port ")
const path=require("path")
if(env.name=="development"){
    app.use(sassMiddleware({
        src: path.join(__dirname,env.asset_path,'scss'),
        dest: path.join(__dirname,env.asset_path,'css'),
        debug: true,
        outputStyle: 'extended',
        prefix: '/css'
    }));
}

app.use(express.urlencoded({extended:true}));

app.use(cookieParser());
app.use(express.static(env.asset_path))
app.use(express.static('./assets'));
//make uploads path available to user
app.use('/uploads',express.static(__dirname +'/uploads'));
app.use(expressLayouts);
app.use(logger(env.morgan.mode, env.morgan.options))

// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
// open the page



// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// mongo store is used to store the session cookie in the db
app.use(session({
    name: 'CODEIAL',
    // TODO change the secret before deployment in production mode
    secret:env.session_cookie_key,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: new MongoStore(
        {
            mongooseConnection: db,
            autoRemove: 'disabled'
        
        },
        function(err){
            console.log(err ||  'connect-mongodb setup ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

// use express router
app.use('/', require('./routes'));


app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});
