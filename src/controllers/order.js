'use strict';

const repository = require('../repositories/order-repository');
const guid = require('guid');
const authService = require('../services/auth-service');
const message = require('../config/message');
const validator = require('./validator/order-validator');

exports.get = async (req, res, next) => {
    try {
        var data = await repository.get();
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
        const data = await authService.decodeToken(token);

        await repository.create({
            description: req.body.description,
            user: data.id,
            number: guid.raw().substring(0, 6),
            items: req.body.items
        });
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

        let erro = validator.updateValidator(id, req.body.items);

        if (erro) {
            res.status(400).send({
                erros: erros
            });
            return;
        }

        let order = await repository.getById(id);
        order.items.forEach(item => {
            req.body.items.push({
                quantity: item.quantity,
                price: item.price,
                product: item.product
            });
        });
 
        let quantity = req.body.items.length;
        let total = req.body.items.reduce(function (total, item) {
            return total + item.price;
        }, 0);

        await repository.update(id, req.body.items, total, quantity);
        res.status(200).send({
            message: message.messages.M0005
        });
    } catch (e) {
        res.status(500).send({
            message: message.erros.E0010
        });
    }
};