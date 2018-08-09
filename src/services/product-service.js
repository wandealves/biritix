'use strict';

const repository = require('../repositories/product-repository');

exports.getAll = async () => {
    return await repository.get();
};

exports.getById = async (id) => {
    return await repository.getById(id);
};

exports.create = async (data) => {
    await repository.create({
        title: data.title,
        description: data.description,
        price: data.price,
        active: true
    });
};

exports.update = async (id, data) => {
    await repository.update(id, data);
};

exports.delete = async (id) => {
    await repository.delete(id)
};