'use strict'

const authService = require('../services/auth-service');
const message = require('../config/message');
const validator = require('./validator/user-validator');
const repository = require('../repositories/user-repository');

exports.authenticate = async (req, res, next) => {
    try {

        let erros = validator.authenticateValidator(req);

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
        let data = await repository.getUser(email, password);

        if (!data) {
            res.status(400).send({
                erros: message.erros.E0013
            });
            return;
        }

        const token = await authService.generateToken({
            email: data.email,
            name: data.name
        });

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
        let erros = validator.createValidator(req);
        if (erros) {
            res.status(400).send({
                erros: erros
            });
            return;
        }

        await repository.create(req.body);
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
        let erros = validator.updateValidator(req);
        if (erros) {
            res.status(400).send({
                erros: erros
            });
            return;
        }

        await repository.update(req.params.id, req.body);

        res.status(200).send({
            message: message.messages.M0003
        });

    } catch (e) {
        res.status(500).send({
            message: message.erros.E0010
        });
    }
};

exports.get = async (req, res, next) => {
    try {
        let data = await repository.get();
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: message.erros.E0007
        });
    }
};

exports.getByEmail = async (req, res, next) => {
    try {
        let data = await repository.getByEmail(req.params.email);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: message.erros.E0007
        });
    }
};