const queue=require("../config/kue")
const commentsMailer=require("../mailers/coments_mailer")
queue.process('emails',(job,done)=>{
   console.log("Emails worker is processing job",job.data)

   commentsMailer.newComment(job.data)
   done()

})
