const jwt = require('jsonwebtoken')
const secretCode = process.env.SECRET_CODE || 'impossible'

const tokenGenerator = (data) => {
    const {id, username, email, password, name, type} = data
    return jwt.sign({
        id, username, email, password, name, type
    }, secretCode)
}

const tokenVerifier = (data) => {
    return jwt.verify(data, secretCode)
}

module.exports= {
    tokenGenerator, tokenVerifier
}