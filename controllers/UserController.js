

const User = require("../models/User");
const authenticator = require("../utils/authenticator");
const UserSession = require("../models/UserSession");
const config = require("../config");
const uuid = require('uuid');



module.exports = class UserController {



  // User Registration
  static async Register(req, res) {
    try {
      const userData = req.body;

      const uuidWithoutHyphens = uuid.v4().replaceAll('-', '');
      userData.email = `${uuidWithoutHyphens}@mail.com`;
      userData.password = uuidWithoutHyphens;
      userData.profile.phone = userData.profile.phone

      const user = new User(userData);   
      const savedUser = await user.save();
      
     
      res.status(201).json({success: true, data: savedUser});
    } catch (error) {
      res.status(400).json({success: false, error: error.message });
    }
  }


  static async Login(req, res) {
    
    try {
      const userData = req.body;
      
      const existingUser = await User.findOne({ "profile.phone": userData.profile.phone });
      if (!existingUser) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      
      
      const token = await authenticator.createSession({ user: {_id: existingUser._id, name: existingUser.profile.name, email: existingUser.email} });
      
      const expiry = config["auth.ttl"] * 60;
  
      const userSession = new UserSession();
      userSession.token = token;
      userSession.expiry = expiry;
      userSession.user_id = existingUser._id;
      await userSession.save();
     
      res.status(200).json( {success: true, token});
      
      return;
    } catch (error) {
      res.status(403).json({ error: error.message });
      return;
    }
  }

  static async Logout(req, res) {
    try {
        const {token, user} = res.locals;
        await UserSession.deleteOne({ token, user_id: user._id });
        const newUser = await User.findByIdAndUpdate(user._id, {status: 'Logged out'}, {new: true});
        res.status(200).json(newUser);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}


};


