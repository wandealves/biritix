'use strict';

const mongoose = require('mongoose');
const Order = mongoose.model('Order');

exports.get = async (data) => {
    var res = await Order
        .find({}, 'number status user items')
        .populate('user', 'name')
        .populate('items.product', 'title');
    return res;
};

exports.create = async (data) => {
    var order = new Order(data);
    await order.save();
};

exports.update = async (id, items, total, quantity) => {
    await Order
        .findByIdAndUpdate(id, {
            $set: {
                total: total,
                quantity: quantity,
                items: items
            }
        });
};

exports.getById = async (id) => {
    const res = await Order
        .findById(id);
    return res;
};