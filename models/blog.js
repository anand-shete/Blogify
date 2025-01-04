const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    coverImageURL: {
        type: String,
        default:"https://anandshete-blogify.s3.ap-south-1.amazonaws.com/defaults/default-blog-image.webp"
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId ,
        ref: 'user',        //this refers to 'user' collection in mongodb
    }
},
    { timestamps: true }
);

const Blog = new mongoose.model('blogs',blogSchema)

module.exports = Blog;