'use strict';

const controller = require('../controllers/user');

module.exports = app =>{
    app.post('/api/auth', controller.authenticate);
    app.post('/api/user', controller.create);
    app.put('/api/user/:id', controller.update);
    app.get('/api/user', controller.get);
    app.get('/api/user/:email', controller.getByEmail);
};