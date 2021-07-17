const mongoose=require("mongoose")
const Friendship_schema=new mongoose.Schema({
    from_user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    to_user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
},
{
    timestamps:true,
}
)
const Friendship=mongoose.model('Friendship',Friendship_schema)
module.exports=Friendship