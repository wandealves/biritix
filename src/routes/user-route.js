'use strict'
const userController = require('../controllers/user');

module.exports = app => {
    app.post('/api/auth', userController.authenticate);
}