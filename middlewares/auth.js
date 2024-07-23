
const config = require("../config");

const {generateResponse} = require('../utils/format');

const authenticator = require('../utils/authenticator');

const User = require('../models/User');
const UserSession = require('../models/UserSession');

const verifyToken = async (token) => {

    const existingSession = await authenticator.checkSession(token);
    
    if (! existingSession) {
        throw new Error("Session doesn't exist or expired");
    }

  
    
    const sessionRecord = await UserSession.findOne({ token, user_id: existingSession.user._id }).lean();
    if (! sessionRecord) {
        throw new Error("Session record not found in database");
    }

    const authneticatedUser = await User.findById(sessionRecord.user_id).lean();
    if (! authneticatedUser) {
        throw new Error("User record against the token is deleted");
    }

    return authneticatedUser;
}

const auth = (req, res, next) => {

    
    const bearerHeader = req.headers['authorization'];

    if (bearerHeader) {
        const token = bearerHeader.split(' ')[1];
        
        verifyToken(token)
        .then((user) => {
            res.locals.user = user;
            res.locals.token = token;
            next();
        })
        .catch((error) => generateResponse(res, 401, error.message));
    } else {
        generateResponse(res, 400, "Token not provided");
    }
}

module.exports = auth;