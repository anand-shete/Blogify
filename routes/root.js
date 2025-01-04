const {Router} = require('express');
const router = Router();
const Blog = require('../models/blog');

router.get('/', async (req, res) => {
    const allBlogs = await Blog.find();
    // const allBlogs = await Blog.find().sort('createdAt');
    res.render('home', {
        user: req.user,
        blogs: allBlogs,
    })
})

module.exports = router;