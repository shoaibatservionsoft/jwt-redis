const UserSession = require('../models/UserSession');

module.exports = async (token, expiry, user) => {
            const userSession = new UserSession();
                userSession.token = token;
                userSession.expiry = expiry;
                userSession.user_id = user._id;
                await userSession.save();
}