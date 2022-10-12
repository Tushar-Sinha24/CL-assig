const jwt = require('jsonwebtoken');

//Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        //Set token from bearer token in bearer
        token = req.headers.authorization.split(' ')[1];
    }

    // else if(req.cookies.token){
    //     token=req.cookies.token
    // }

    //Make Sure token exits
    if (!token) {
        return res.status(401).json('Not authousied to acess this route')
    }

    try {
        //verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log(decoded);

        req.user = await User.findById(decoded.id);

        next();
    } catch (error) {
        return res.status(401).json('Not authousied to acess this route')
    }
});