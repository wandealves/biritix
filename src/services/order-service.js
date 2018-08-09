'use strict';

const repository = require('../repositories/order-repository');
const guid = require('guid');

exports.getAll = async () => {
    return await repository.get();
};

exports.create = async (data, user) => {
    await repository.create({
        description: data.description,
        user: user.id,
        number: guid.raw().substring(0, 6),
        items: data.items
    });
};

exports.update = async (id, items) => {

    let order = await repository.getById(id);
    order.items.forEach(item => {
        items.push({
            quantity: item.quantity,
            price: item.price,
            product: item.product
        });
    });

    let total = items.reduce(function (total, item) {
        return total + item.price;
    }, 0);

    await repository.update(id, req.body.items, total, items.length);
};