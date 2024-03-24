const jwt = require('jsonwebtoken');

const secret = 'OmniMan';

createTokenForUser  = (user)=>{
    const payload = {
        _id:user.id,
        email:user.email,
        profileImageURL: user.profileImageURL,
        name:user.fullName,
        role:user.role,
    }
    const token = jwt.sign(payload,secret);
    return token;
}

validateToken = (token)=>{
    const payload = jwt.verify(token,secret);
    return payload;
}

module.exports = {createTokenForUser, validateToken}