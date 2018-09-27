'use strict';

const jwt = require('jsonwebtoken'),
    config = require('config');

exports.generateToken = async (data) => {
    return jwt.sign(data, config.get('app.secret'), {
        expiresIn: 86400
    });
};

exports.decodeToken = async (token) => {
    let data = await jwt.verify(token, config.get('app.secret'));
    return data;
};

exports.authorize = async (req, res, next) => {
    let token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token) {
        res.status(401).json({
            message: config.get('message.M0006')
        });
    } else {
        jwt.verify(token, config.get('app.secret'), function (error, decoded) {
            if (error) {
                res.status(401).json({
                    message: config.get('message.M0005')
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
            message: config.get('message.M0005')
        });
    } else {
        jwt.verify(token, config.get('app.secret'), function (error, decoded) {
            if (error) {
                res.status(401).json({
                    message: config.get('message.M0005')
                });
            } else {
                if (decoded.roles.includes('admin')) {
                    next();
                } else {
                    res.status(403).json({
                        message: config.get('message.M0012')
                    });
                }
            }
        });
    }
};