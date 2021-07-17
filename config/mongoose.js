const mongoose = require('mongoose');
const env=require("../config/enviorment")
mongoose.connect(`mongodb://localhost/${env.db}`,{useCreateIndex:false,useNewUrlParser:false,useFindAndModify:false,useUnifiedTopology:false});

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));


db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
});


module.exports = db;