const jwt = require('jsonwebtoken');
const env = require('dotenv');
env.config();

function checkToken(req,res,next){
    try{
        const token = req.headers.authorization;
        const decoded = jwt.verify(token, process.env.token);
        req.userData = decoded;
        next();
    }catch(error){
        return res.status(401).send({message: 'Authentification failed', error});
    }
}
module.exports = checkToken;