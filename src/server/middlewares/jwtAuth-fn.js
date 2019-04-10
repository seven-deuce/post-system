const jwt = require("jsonwebtoken")

module.exports = (token) => {

    if (!token || token == " ") { req.authenticated = false; return next() }

    let decodedToken;
    try {  decodedToken = jwt.verify(token, "secretHash") } 
    catch (err) { return null }

    if(!decodedToken) { return null}

    return {...decodedToken, token}

}
