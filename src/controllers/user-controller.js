'use strict';

const userService = require('../services/user-service');
const errosService = require('../services/erros-service');
const validator = require('./validator/user-validator');
const config = require('config');

class UserController {
    constructor(repository) {
        this.userRepository = repository;;
    }

    async getAll(req, res, next) {
        try {
            let data = await this.userRepository.get();
            res.status(200).send(data);
        } catch (e) {
            errosService.erro_500(next, config.get('message.M0008'));
        }
    }

    async getByEmail(req, res, next) {
        try {
            let data = await this.userRepository.getByEmail(req.params.email);
            res.status(200).send(data);
        } catch (e) {
            errosService.erro_500(next, config.get('message.M0008'));
        }
    }

    async create(req, res, next) {
        try {
            let erros = validator.create(req);
            if (erros) {
                errosService.erro_400(next, erros);
                return;
            }

            await this.userRepository.create(req.body);
            res.status(201).send({
                message: config.get('message.M0013')
            });

        } catch (e) {
            errosService.erro_500(next, config.get('message.M0014'));
        }
    }

    async update(req, res, next) {
        try {
            let erros = validator.update(req);
            if (erros) {
                errosService.erro_400(next, erros);
                return;
            }

            await this.userRepository.update(req.params.id, req.body);

            res.status(200).send({
                message: config.get('message.M0015')
            });

        } catch (e) {
            errosService.erro_500(next, config.get('message.M0016'));
        }
    }

    async authenticate(req, res, next) {
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
            let data = await this.userRepository.getUser(email, password);

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
    }
}

module.exports = function (repository) {
    return new UserController(repository);
};