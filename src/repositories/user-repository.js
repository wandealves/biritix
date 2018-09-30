'use strict';

const bcrypt = require('bcrypt');
const userModel = require('../models/user');

class UserRepository {

    constructor(model) {
        this.userModel = model;
    }

    async create(data) {
        data.password = await bcrypt.hash(data.password, 10);
        let user = new this.userModel(data);
        await user.save();
    }

    async update(id, data) {
        await this.userModel
            .findByIdAndUpdate(id, {
                $set: {
                    name: data.name,
                    password: data.password,
                    active: data.active
                }
            });
    }

    async get() {
        const data = await this.userModel.find({
            active: true
        }, 'name email active roles');
        return data;
    }

    async getByEmail(email) {
        const data = await this.userModel.findOne({
            email: email
        }, 'name email active roles');
        return data;
    }

    async getUser(email, password) {

        const data = await this.userModel.findOne({
            email: email,
            active: true
        }, 'name email password active roles');

        if (data) {

            if (!bcrypt.compare(password, data.password)) {
                return null;
            }
        }

        return data;
    }

}

module.exports = function (user) {
    return new UserRepository(user);
};