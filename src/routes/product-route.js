'use strict';

const controller = require('../controllers/product');
const authService = require('../services/auth-service');

module.exports = app => {
    app.post('/api/product', authService.isAdmin, controller.create);
    app.put('/api/product/:id', authService.isAdmin, controller.update);
    app.get('/api/product', authService.isAdmin, controller.get);
    app.get('/api/product/:id', authService.isAdmin, controller.getById);
    app.delete('/api/product', authService.isAdmin, controller.delete);
};