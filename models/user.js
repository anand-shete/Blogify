const mongoose = require('mongoose');
const { createHmac, randomBytes } = require('crypto');
const { createTokenForUser } = require('../services/auth');

const userSchema = new mongoose.Schema({
    fullName: {
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
        default: "/images/default.jpg"
    },
    role: {
        type: String,
        enum: ['admin', 'user'], //can't be anything other than these two values
        default: 'user'
    }
},
    {
        timestamps: true
    }
);
userSchema.pre('save', function (next) {
    const user = this;
    if (!user.isModified('password')) return;

    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac('sha256', salt).update(user.password).digest("hex"); //create hashedPassword for users
    this.salt = salt;
    this.password = hashedPassword;
    next();
})
//salt + UserPassword => Hashing Algorithm sha256=> Hashed
userSchema.static("matchPasswordAndGenerateToken", async function (email, password) {
    const user = await this.findOne({ email });
    if (!user) throw new Error("User Not Found");

    const salt = user.salt;
    const hashedPassword = user.password;

    const providedPassword = createHmac('sha256', salt)  //create hashedPassword for users
        .update(password)
        .digest("hex");

    if (hashedPassword !== providedPassword)
        throw new Error("Incorrect Password")

    const token = createTokenForUser(user)
    return token;
})
const User = mongoose.model('user', userSchema);

module.exports = User;