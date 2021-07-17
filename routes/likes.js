const express = require('express');
const router = express.Router();

const likecntl=require("../controllers/likes_controller")
router.get("/toggle",likecntl.toggleLike)

module.exports=router