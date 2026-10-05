const jwt = require('jsonwebtoken');

exports.verifyToken = (req,res,next) => {
    // const token = req.headers['authorization'];
    const token = req.headers['authorization'];
    // console.log("verifyToken.middleware access",req.headers)
    if (!token) return res.sendStatus(403);
    console.log("verifyToken.middleware access",token)
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            console.log("verifyToken.middleware access:error")
            return res.status(403).send({error:true,message:err.message});
        } else {
            req.userId = decoded.id;
            console.log("verifyToken.middleware access",decoded)
            next();    
        }
    });    
}