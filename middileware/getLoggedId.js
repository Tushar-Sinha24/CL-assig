const jwt = require('jsonwebtoken');
const {getUserByUserId} =require('../api/user/user.service')

//Protect routes
module.exports.protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json('NO users is login')
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log(decoded);

        req.user= decoded.id;

    } catch (error) {
        console.log(error)
        return res.status(401).json('Not authorized to ascess thos route')
    }
}