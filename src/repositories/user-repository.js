'use strict'

const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.create = async (data) => {
    let user = new User(data);
    await user.save();
};

exports.update = async (id, data) => {
    await User
        .findByIdAndUpdate(id, {
            $set: {
                name: data.name,
                password: data.password,
                active: data.active
            }
        });
};

exports.get = async () => {
    const data = await User.find({
        active: true
    }, 'name email active');
    return data;
};

exports.getByEmail = async (email) => {
    const data = await User.findOne({
        email: email
    }, 'name email active');
    return data;
};