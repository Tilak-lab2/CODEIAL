const Post= require("../../../models/post")
const Comment=require("../../../models/comment")
exports.index=async (req,res)=>{
    let posts = await Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    
    });

    
    
    return res.json(200,{
       message:"list of posts",
       
       posts:posts
    })
}
module.exports.destroy = async function(req, res){

    try{
        let post = await Post.findById(req.params.id);
        console.log(post);

       if (post.user == req.user.id){
        //    await Like.deleteMany({likeable:post,onModel:"Post"})
        //    await Like.deleteMany({_id:{$in:post.comments}}  )
           
    
            post.remove();

            await Comment.deleteMany({post : req.params.id});

           // req.flash('success', 'Post and associated comments deleted!');

            return res.json(200,{
                message:"Successful ,Post and associated comments deleted successfully",
            })
       }else{
        //    req.flash('error', 'You cannot delete this post!');
          //  return res.redirect('back');
       
          return res.json(401,{
              Message:"You cannot delete this post"
          })
    }
    }catch(err){
       // req.flash('error', err);
       console.log("*********************************",err)
        return res.json(500,{
          message:"Internal Server Error"

        });
    }
}