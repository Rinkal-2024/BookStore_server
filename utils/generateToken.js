const jwt = require('jsonwebtoken')

const generateToken = (userId) =>{
    return jwt.sign({id: userId} , 'nodejs', {
        expireIn : '30d',
    })
}

module.exports = generateToken