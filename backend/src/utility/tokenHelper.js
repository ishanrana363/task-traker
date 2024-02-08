const jwt = require("jsonwebtoken");
const parseToken = (req)=>{
    try {
        let authValue = req.headers.authorization;
        let authToken = authValue.split(' ')[1];
        let verifyToken = jwt.verify(authToken,process.env.AUTH_KEY);
        return verifyToken.data;
    } catch (error) {
        console.log(error)
        throw new Error()
    }
}


module.exports = {
    parseToken
}