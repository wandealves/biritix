'use strict';

const productService = require('../services/product-service');

exports.get = async (req, res, next) => {
    try {
        var data = await productService.getAll();
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({});
    }
};

exports.getById = async (req, res, next) => {
    try {
        var data = await productService.getById(req.params.id);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({});
    }
};

exports.create = async (req, res, next) => {

    try {
        await productService.create(req.body);
        res.status(201).send({});
    } catch (e) {
        console.log(e);
        res.status(500).send({});
    }
};

exports.update = async (req, res, next) => {
    try {
        await productService.update(req.params.id, req.body);
        res.status(200).send({});
    } catch (e) {
        res.status(500).send({});
    }
};

exports.delete = async (req, res, next) => {
    try {
        await productService.delete(req.body.id)
        res.status(200).send({});
    } catch (e) {
        res.status(500).send({});
    }
};