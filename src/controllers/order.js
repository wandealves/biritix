'use strict';

const authService = require('../services/auth-service');
const orderService = require('../services/order-service');

exports.get = async (req, res, next) => {
    try {
        var data = await orderService.getAll();
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({});
    }
}

exports.create = async (req, res, next) => {
    try {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const user = await authService.decodeToken(token);

        await orderService.create(req.body, user);

        res.status(201).send({});
    } catch (e) {
        console.log(e);
        res.status(500).send({});
    }
};

exports.update = async (req, res, next) => {
    try {
        let id = req.params.id;

        await orderService.update(id, req.body.items);
        res.status(200).send({});
    } catch (e) {
        res.status(500).send({});
    }
};