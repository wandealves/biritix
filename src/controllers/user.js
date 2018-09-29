'use strict';

const userService = require('../services/user-service');
const errosService = require('../services/erros-service');
const validator = require('./validator/user-validator');
const config = require('config');

exports.get = async (req, res, next) => {
    try {
        let data = await userService.getAll();
        res.status(200).send(data);
    } catch (e) {
        errosService.erro_500(next, config.get('message.M0008'));
    }
};

exports.getByEmail = async (req, res, next) => {
    try {
        let data = await userService.getByEmail(req.params.email);
        res.status(200).send(data);
    } catch (e) {
        errosService.erro_500(next, config.get('message.M0008'));
    }
};

exports.authenticate = async (req, res, next) => {
    try {

        let erros = validator.authenticate(req);

        if (erros) {
            errosService.erro_400(next, erros);
            return;
        }

        let {
            email,
            password
        } = req.body;
        let data = await userService.getUser(email, password);

        if (!data) {
            errosService.erro_400(next, config.get('message.M0010'));
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
        errosService.erro_500(next, config.get('message.M0008'));
    }
};

exports.create = async (req, res, next) => {
    try {
        let erros = validator.create(req);
        if (erros) {
            errosService.erro_400(next, erros);
            return;
        }

        await userService.create(req.body);
        res.status(201).send({
            message: config.get('message.M0013')
        });

    } catch (e) {
        errosService.erro_500(next, config.get('message.M0014'));
    }
};

exports.update = async (req, res, next) => {
    try {
        let erros = validator.update(req);
        if (erros) {
            errosService.erro_400(next, erros);
            return;
        }

        await userService.update(req.params.id, req.body);

        res.status(200).send({
            message: config.get('message.M0015')
        });

    } catch (e) {
        errosService.erro_500(next, config.get('message.M0016'));
    }
};