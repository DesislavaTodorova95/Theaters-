const router = require('express').Router();
const {isUser}=require ('../middlewares/guards')
router.get('/create',isUser() , (req, res)=>{
    res.render('play/create')
});
router.post('/create',isUser(), async (req,res)=>{
    try{
       const playData = {
           title: req.body.title,
           description:req.body.description,
           imageUrl:req.body.imageUrl,
           public:Boolean(req.body.public),
          
           author: req.user._id,
 }
 await req.storage.createPlay(playData)

 res.redirect('/')
    }catch(err){
       let errors = (Object.values(err.errors).map(e=>e.properties.message));
     
const ctx={
errors: [err.message]
}

res.render('play/create', ctx)
    }


    
})


module.exports = router
