
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

const config = require("../config");

const createSession = (data) => {
    return new Promise((resolve, reject) => {
        const expiresIn = config['auth.ttl'] + 'm';
        jwt.sign(data, config['auth.secret'], { expiresIn }, (error, token) => {
            if (error)
                reject(error);
            resolve(token);
        });
    });
}

const checkSession = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, config['auth.secret'], (error, data) => {
            if (error) 
                console.log(error)
                // reject(error)
            
            resolve(data);
        });
    });
}

const hidePass = (password) => bcrypt.hash(password, config['pass.secret']);

const checkPass = (password, hash) => bcrypt.compare(password, hash);

module.exports = {
    createSession,
    checkSession,
    hidePass,
    checkPass
}