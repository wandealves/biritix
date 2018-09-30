'use strict';

const authService = require('../services/auth-service');

exports.token = async (data) => {
    return await authService.generateToken({
        id: data._id,
        email: data.email,
        name: data.name,
        roles: data.roles
    });
};