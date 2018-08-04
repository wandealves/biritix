'use strict';

const controller = require('../controllers/order');
const authService = require('../services/auth-service');

module.exports = app => {
    app.post('/api/order', authService.authorize, controller.create);
    app.put('/api/order/:id', authService.authorize, controller.update);
    app.get('/api/order', authService.authorize, controller.get);
    //  app.get('/api/order/:id', authService.authorize, controller.getById);
};