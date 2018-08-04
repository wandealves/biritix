'use strict';

const mongoose = require('mongoose');
const User = mongoose.model('User');
const bcrypt = require('bcrypt');

exports.create = async (data) => {

    let hash = await bcrypt.hash(data.password, 10);
    data.password = hash;
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
    }, 'name email active roles');
    return data;
};

exports.getByEmail = async (email) => {
    const data = await User.findOne({
        email: email
    }, 'name email active roles');
    return data;
};

exports.getUser = async (email, password) => {

    const data = await User.findOne({
        email: email,
        active: true
    }, 'name email password active roles');

    if (data) {

        if (!await bcrypt.compare(password, data.password)) {
            return null;
        }
    }

    return data;
};