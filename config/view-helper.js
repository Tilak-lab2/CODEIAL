const { json } = require("express")
const env=require("./enviorment")
const fs=require("fs")
const path=require("path")
module.exports=(app)=>{
    app.locals.assetPath=(filePath)=>{
        if(env.name='development'){
            return filePath
        }
        return "/" + JSON.parse(fs.readFileSync(path.join(__dirname,"../public/assets/rev-manifest.json")))(filePath)
    }
}