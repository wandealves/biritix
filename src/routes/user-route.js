'use strict'
const userController = require('../controllers/user');

module.exports = app =>{
    app.post('/api/auth', userController.authenticate);
    app.post('/api/user', userController.create);
    app.put('/api/user/:id', userController.update);
    app.get('/api/user', userController.get);
    app.get('/api/user/:email', userController.getByEmail);
};