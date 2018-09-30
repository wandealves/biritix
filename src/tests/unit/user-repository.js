'use strict';

const fixtures = require('../fixtures'),
  userRepository = require('../../repositories/user-repository')(fixtures.mongo),
  assert = require('assert');

describe('UserRepository', function () {
  it('#find', async function () {
    let data = await userRepository.get();
    assert.equal(data.length, 2);
  });
  it('#findByEmail', async () => {
    let data = await userRepository.getByEmail('naruto@email.com');
    assert.equal(data.email, 'naruto@email.com');
  });
});