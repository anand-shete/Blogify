const mongoose = require('mongoose');
const { createHmac, randomBytes } = require('crypto');
const bcrypt = require('bcrypt')
const { createTokenForUser } = require('../services/auth');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    salt: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    profileImageURL: {
        type: String,
        default: "https://anandshete-blogify.s3.ap-south-1.amazonaws.com/defaults/default-profile-pic.png"
    },
    role: {
        type: String,
        enum: ['admin', 'user'], //can't be anything other than these two values
        default: 'user'
    }
},
    { timestamps: true }
);
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = bcrypt.hashSync(this.password, salt);
    this.salt = salt;
    this.password = hashedPassword;
    next();
})
//salt + UserPassword => Hashing Algorithm sha256=> Hashed
userSchema.methods.comparePassword = async function (password) {    // This method can be called on any User instance
    return await bcrypt.compare(password, this.password)
}
const User = mongoose.model('user', userSchema);

module.exports = User;