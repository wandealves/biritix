'use strict'

const authService = require('../services/auth-service');
const message = require('../config/message');

exports.authenticate = async (req, res, next) => {
    try {
        let data = req.body;
        const token = await authService.generateToken({
            email: data.email,
            name: data.name
        });

        res.status(200).send({
            token: token,
            data: {
                email: data.email,
                password: data.password
            }
        });
    } catch (e) {
        res.status(500).send({
            message: message.E0007
        });
    }
};

exports.create = async (req, res, next) => {
    try {
        req.assert('email', message.E0001).notEmpty();
        req.assert('email', message.E0003).isEmail();
        req.assert('password', message.E0002).notEmpty();
        req.assert('password', message.E0006).len(5, 100);
        let erros = req.validationErrors();
        if (erros) {
            res.status(400).send({
                erros: erros
            });
            return;
        }
        let data = req.body;
        res.status(200).send({
            data: {
                data
            }
        });
    } catch (e) {
        res.status(500).send({
            message: message.E0007
        });
    }
};