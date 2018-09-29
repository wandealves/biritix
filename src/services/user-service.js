'use strict';

const repository = require('../repositories/user-repository');
const authService = require('../services/auth-service');

exports.getAll = async () => {
    return await repository.get();
};

exports.getByEmail = async (email) => {
    return await repository.getByEmail(email);;
};

exports.getUser = async (email, password) => {
    return await repository.getUser(email, password);
};

exports.token = async (data) => {
    return await authService.generateToken({
        id: data._id,
        email: data.email,
        name: data.name,
        roles: data.roles
    });
};

exports.create = async (data) => {
    data.roles = ['user'];
    await repository.create(data);
};

exports.update = async (id, data) => {
    await repository.update(id, data);
};