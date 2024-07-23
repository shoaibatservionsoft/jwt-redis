const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    expiry: {
        type: Number,
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    timestamps: {
        type: Date,
        default: Date.now
    }
});

const UserSession = mongoose.model('UserSession', userSchema);

module.exports = UserSession;