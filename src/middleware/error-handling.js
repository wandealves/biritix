'use strict';

class ErrorHandling {
    error(err, request, response, next) {
        response.status(err.status || 500).json({
            err: err.message,
            status: err.status
        });
    }
}

module.exports = new ErrorHandling();