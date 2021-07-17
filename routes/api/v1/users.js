const express = require('express');

const router = express.Router();
const user=require("../../../controllers/api/v1/users_api")
router.post("/create-session",user.createSession)
module.exports=router