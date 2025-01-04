const express = require('express');
const multer = require('multer');
const multerS3 = require('multer-s3');
const { S3Client } = require('@aws-sdk/client-s3');

const Blog = require('../models/blog');
const Comment = require('../models/comment')
const router = express.Router();

// AWS IAM configuration
const s3Client = new S3Client({
    region: 'ap-south-1',
    credentials: {               // create new access key and secret access key 
        accessKeyId: process.env.ACCESS_KEY,
        secretAccessKey: process.env.SECRET_ACCESS_KEY,
    }
});

// S3 upload configuration
const upload = multer({
    storage: multerS3({
        s3: s3Client,
        bucket: 'anandshete-blogify',
        contentType: multerS3.AUTO_CONTENT_TYPE,    // auto sets the correct contentType
        metadata: function (req, file, cb) {        // metadata for S3 object
            cb(null, { fieldName: file.fieldname }) // name of the field the form came from
        },
        key: function (req, file, cb) {
            const filename = `uploads/blogs/${Date.now()}-${file.originalname}`
            cb(null, filename)
        }
    })
})

// url to upload cover image of blog. parameter of upload.single() represent name field of the form
router.post('/', upload.single('blogCoverImage'), async (req, res) => {
    const { title, body } = req.body;
    const blog = await Blog.create({
        title, body,
        createdBy: req.user._id,
        coverImageURL: req.file?.location,
    })
    // console.log(req.file);
    return res.redirect(`/blog/${blog._id}`)
})

router.get('/add-new', (req, res) => {
    res.render('addBlog', {
        user: req.user,
    })
})

router.get('/:id', async (req, res) => {  //Dynamic Route
    const blog = await Blog.findById(req.params.id).populate('createdBy');
    const comment = await Comment.find({ blogId: req.params.id }).populate('createdBy');
    res.render('blog', {
        user: req.user,
        blog,
        comment
    })
})

router.post('/comment/:blogId', async (req, res) => {
    const comment = await Comment.create({
        content: req.body.content,
        blogId: req.params.blogId,
        createdBy: req.user._id
    });
    if (!comment.content) {
        return res.redirect(`/blog/${comment.blogId}`)
    }
    return res.redirect(`/blog/${req.params.blogId}`);
})
module.exports = router;