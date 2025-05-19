const jwt = require('jsonwebtoken')
const generateToken=(user)=>{
    return jwt.sign({email:user.email,id:user._id}, process.env.JWT_KEY)
}
module.exports.generateToken = generateToken; //named export
//this type of export is equivalent to module.exports = {generateToken:genrateToken};  
//this type of export also equivalent to module.exports = {genrateToken};  