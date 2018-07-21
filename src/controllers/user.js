'use strict'

const authService = require('../services/auth-service');

module.exports.authenticate = async (res, data) => {

    const token = await authService.generateToken({
        email: data.email,
        name: data.name
    });

    res.status(200).send({
        token: token,
        data: {
            email: data.email,
            password: data.password
        }
    });
};