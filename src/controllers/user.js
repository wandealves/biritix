'use strict'

const authService = require('../services/auth-service');

module.exports.authenticate = async (req, res, next) => {
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
            message: 'Falha na autenticação'
        });
    }
};