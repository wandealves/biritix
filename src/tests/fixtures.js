'use strict';

const debug = require('debug')('biritix:fixtures'),
    assert = require('assert');


let fixtures = {
    mongo: {
        collection: function (name) {
            return fixtures.mongo;
        },
        ObjectId: function () {
            return {};
        },
        find() {
            return [{
                    name: 'João',
                    email: 'joao@email.com',
                    password: "12345678",
                    active: true
                },
                {
                    name: 'Maria',
                    email: 'maria@email.com',
                    password: "2222222",
                    active: true
                }
            ];
        },
        findOne() {
            return {
                name: 'Naruto',
                email: 'naruto@email.com',
                password: "3333333",
                active: true
            }
        }
    },
    next: function (err) {
        debug('catch err', err);
        assert.deepEqual(err, {});
    }
};

module.exports = fixtures;