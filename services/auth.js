const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET_KEY;

createTokenForUser = (user) => {
    const payload = {
        _id: user.id,
        email: user.email,
        profileImageURL: user.profileImageURL,
        name: user.name,
        role: user.role,
    }
    return jwt.sign(payload, secret);
}

validateToken = (token) => {
    return jwt.verify(token, secret);
}

module.exports = { createTokenForUser, validateToken }