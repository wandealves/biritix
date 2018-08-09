'use strict';

const authService = require('../services/auth-service');
const orderService = require('../services/order-service');
const message = require('../config/message');
const validator = require('./validator/order-validator');

exports.get = async (req, res, next) => {
    try {
        var data = await orderService.getAll();
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: message.erros.E0016
        });
    }
}

exports.create = async (req, res, next) => {
    try {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const user = await authService.decodeToken(token);

        await orderService.create(req.body, user);

        res.status(201).send({
            message: message.messages.M0007
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            message: message.erros.E0009
        });
    }
};

exports.update = async (req, res, next) => {
    try {
        let id = req.params.id;

        let erro = validator.update(id, req.body.items);

        if (erro) {
            res.status(400).send({
                erros: erros
            });
            return;
        }

        await orderService.update(id, req.body.items);
        res.status(200).send({
            message: message.messages.M0005
        });
    } catch (e) {
        res.status(500).send({
            message: message.erros.E0010
        });
    }
};