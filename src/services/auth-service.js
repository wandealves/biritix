'use strict';

const jwt = require('jsonwebtoken');
const authConfig = require('../config/app-settings');
const message = require('../config/message');

exports.generateToken = async (data) => {
    return jwt.sign(data, authConfig.secret, {
        expiresIn: 86400
    });
};

exports.decodeToken = async (token) => {
    let data = await jwt.verify(token, authConfig.secret);
    return data;
};

exports.authorize = async (req, res, next) => {
    let token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token) {
        res.status(401).json({
            message: message.erros.E0005
        });
    } else {
        jwt.verify(token, authConfig.secret, function (error, decoded) {
            if (error) {
                res.status(401).json({
                    message: message.erros.E0004
                });
            } else {
                next();
            }
        });
    }
};

exports.isAdmin = function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token) {
        res.status(401).json({
            message: message.erros.E0004
        });
    } else {
        jwt.verify(token, authConfig.secret, function (error, decoded) {
            if (error) {
                res.status(401).json({
                    message: message.erros.E0004
                });
            } else {
                if (decoded.roles.includes('admin')) {
                    next();
                } else {
                    res.status(403).json({
                        message: message.erros.E0017
                    });
                }
            }
        });
    }
};