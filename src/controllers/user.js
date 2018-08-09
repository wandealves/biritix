'use strict';

const userService = require('../services/user-service');
const message = require('../config/message');
const validator = require('./validator/user-validator');

exports.get = async (req, res, next) => {
    try {
        let data = await userService.getAll();
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: message.erros.E0007
        });
    }
};

exports.getByEmail = async (req, res, next) => {
    try {
        let data = await userService.getByEmail(req.params.email);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: message.erros.E0007
        });
    }
};

exports.authenticate = async (req, res, next) => {
    try {

        let erros = validator.authenticate(req);

        if (erros) {
            res.status(400).send({
                erros: erros
            });
            return;
        }

        let {
            email,
            password
        } = req.body;
        let data = await userService.getUser(email, password);

        if (!data) {
            res.status(400).send({
                erros: message.erros.E0013
            });
            return;
        }

        const token = await userService.token(data);

        res.status(200).send({
            token: token,
            data: {
                email: data.email
            }
        });
    } catch (e) {
        res.status(500).send({
            message: message.erros.E0007
        });
    }
};

exports.create = async (req, res, next) => {
    try {
        let erros = validator.create(req);
        if (erros) {
            res.status(400).send({
                erros: erros
            });
            return;
        }

        await userService.create(req.body);
        res.status(201).send({
            message: message.messages.M0001
        });

    } catch (e) {
        res.status(500).send({
            message: message.erros.E0009
        });
    }
};

exports.update = async (req, res, next) => {
    try {
        let erros = validator.update(req);
        if (erros) {
            res.status(400).send({
                erros: erros
            });
            return;
        }

        await userService.update(req.params.id, req.body);

        res.status(200).send({
            message: message.messages.M0003
        });

    } catch (e) {
        res.status(500).send({
            message: message.erros.E0010
        });
    }
};