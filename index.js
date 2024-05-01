require("dotenv").config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const {checkCookieForAuthentication}= require('./middlewares/auth')
const Blog = require('./models/blog');
const app = express();
const PORT  = process.env.PORT || 8000; 

const UserRoute = require('./routes/user');
const BlogRoute = require('./routes/blog');

mongoose.connect(process.env.MONGO_URL).then(()=>console.log("Db connected")).catch((e)=>("Db error",e))

app.set('view engine','ejs')
app.set('views',path.resolve('./views'))

app.use(express.urlencoded({extended:false}))
app.use(cookieParser());
app.use(checkCookieForAuthentication('token'))
app.use(express.static(path.resolve('./public')))   //middleware to access static files

app.get('/',async(req,res)=>{
    const allBlogs = await Blog.find();
    // const allBlogs = await Blog.find().sort('createdAt');
    res.render('home',{
        user:req.user,
        blogs: allBlogs,
    })
})
app.use('/user',UserRoute);
app.use('/blog',BlogRoute);

app.listen(PORT,()=>console.log(`Server started on port:${PORT}`))