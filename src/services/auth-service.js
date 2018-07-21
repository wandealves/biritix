'use strict'

const jwt = require('jsonwebtoken');
const authConfig = require('../config/app-settings');

exports.generateToken = async (data) => {
    return jwt.sign(data, authConfig.secret, {
        expiresIn: 86400
    });
};

exports.decodeToken = async (token) => {
    let data = await jwt.verify(token, authConfig.secret);
    return data;
};

exports.authorize = (req, res, next) => {
    let token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token) {
        res.status(401).json({
            message: 'Acesso Restrito'
        });
    } else {
        jwt.verify(token, authConfig.secret, function (error, decoded) {
            if (error) {
                res.status(401).json({
                    message: 'Token Inválido'
                });
            } else {
                next();
            }
        });
    }
};