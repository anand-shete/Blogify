const { Router } = require('express');
const multer = require('multer');
const Blog = require('../models/blog');
const Comment = require('../models/comment')
const path = require('path');

const router = Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null,path.resolve(`public/uploads`))    //This directory must be present aldready
    },
    filename: function (req, file, cb) {
        const filename = `${Date.now()}-${file.originalname}`;
        cb(null,filename);
    }
})
const upload = multer({ storage: storage })

router.get('/add-new', (req, res) => {
    res.render('addBlog', {
        user: req.user,
    })
})
router.get('/:id',async(req,res)=>{  //Dynamic Route
    const blog = await Blog.findById(req.params.id).populate('createdBy');
    const comment = await Comment.find({blogId:req.params.id}).populate('createdBy');
    res.render('blog',{
        user:req.user,
        blog,
        comment    })   
})
router.post('/', upload.single('coverImage'),async(req, res) => {
   const {title,body} = req.body; 
   const blog = await Blog.create({
    title,body,
    createdBy:req.user._id,
    coverImageURL: `/uploads/${req.file.filename}`,
   })
    return res.redirect(`/blog/${blog._id}`)
})
router.post('/comment/:blogId' ,async(req,res)=>{
    const comment = await Comment.create({
        content:req.body.content,
        blogId : req.params.blogId,
        createdBy:req.user._id
    });
    if(!comment.content) {
        return res.redirect(`/blog/${comment.blogId}`)
    }
    return res.redirect(`/blog/${req.params.blogId}`);
})
module.exports = router;