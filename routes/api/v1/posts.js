const express = require('express');
const posts_api=require("../../../controllers/api/v1/posts_api")

const router = express.Router();
router.get("/",posts_api.index)
router.delete("/:id",posts_api.destroy) 


module.exports=router;