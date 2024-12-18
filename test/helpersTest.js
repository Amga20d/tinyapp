const { assert } = require('chai');

const { getUserByEmail } = require('../helpers.js');

const testUsers = {
  "userRandomID": {
    id: "userRandomID", 
    email: "[email protected]", 
    password: "purple-monkey-dinosaur"
  },
  "user2RandomID": {
    id: "user2RandomID", 
    email: "[email protected]", 
    password: "dishwasher-funk"
  }
};

describe('getUserByEmail', function() {
  it('should return a user with valid email', function() {
    const user = getUserByEmail("[email protected]", testUsers);
    const expectedUserID = "userRandomID";
    assert.strictEqual(user.id, expectedUserID);
  });

  it('should return undefined with non-existent email', function() {
    const user = getUserByEmail("nomail@gmail.com", testUsers);
    assert.strictEqual(user, undefined);
  });
});
