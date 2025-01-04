const { Router } = require('express');
const User = require('../models/user');
const multer = require('multer');
const multerS3 = require('multer-s3');
const { S3Client } = require('@aws-sdk/client-s3');
const { createTokenForUser } = require('../services/auth')
const router = Router();


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
            const filename = `uploads/users/${Date.now()}-${file.originalname}`
            cb(null, filename)
        }
    })
})

router.get('/signup', (req, res) => {
    res.render('signup')
})

router.post('/signup', upload.single('profileImageURL'), async (req, res) => {
    const { name, email, password } = req.body;
    await User.create({
        name, email, password,
        profileImageURL: req.file?.location
    })
    // console.log(req.file);
    return res.redirect('/user/signin')
})

router.get('/signin', (req, res) => {
    res.render('signin');
})

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        const isValid = await user.comparePassword(password);
        if (!isValid) throw error;

        const token = createTokenForUser(user)
        return res.cookie("token", token).redirect('/');
    } catch (error) {
        return res.render('signin', {
            error: 'Incorrect Email or Password'
        })
    }
})

router.get('/logout', (req, res) => {
    res.clearCookie('token').redirect('/')
})

module.exports = router;    