'use strict';

const productService = require('../services/product-service');
const message = require('../config/message');

exports.get = async (req, res, next) => {
    try {
        var data = await productService.getAll();
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: message.erros.E0015
        });
    }
};

exports.getById = async (req, res, next) => {
    try {
        var data = await productService.getById(req.params.id);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: message.erros.E0015
        });
    }
};

exports.create = async (req, res, next) => {

    try {
        await productService.create(req.body);
        res.status(201).send({
            message: message.messages.M0004
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
        await productService.update(req.params.id, req.body);
        res.status(200).send({
            message: message.messages.M0005
        });
    } catch (e) {
        res.status(500).send({
            message: message.erros.E0010
        });
    }
};

exports.delete = async (req, res, next) => {
    try {
        await productService.delete(req.body.id)
        res.status(200).send({
            message: message.messages.M0006
        });
    } catch (e) {
        res.status(500).send({
            message: message.erros.E0011
        });
    }
};