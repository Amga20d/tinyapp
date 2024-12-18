const { assert } = require('chai');
const { getUserByEmail, urlsForUser } = require('../helpers.js');

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

describe('urlsForUser', function() {
  it('should return urls that belong to the specified user', function() {
    const urlDatabase = {
      "b2xVn2": { longURL: "http://www.lighthouselabs.ca", userID: "user1" },
      "9sm5xK": { longURL: "http://www.google.com", userID: "user2" },
      "a1b2c3": { longURL: "http://www.example.com", userID: "user1" }
    };

    const expectedOutput = {
      "b2xVn2": { longURL: "http://www.lighthouselabs.ca", userID: "user1" },
      "a1b2c3": { longURL: "http://www.example.com", userID: "user1" }
    };

    const result = urlsForUser('user1', urlDatabase);
    assert.deepEqual(result, expectedOutput);
  });

  it('should return an empty object if the user has no urls', function() {
    const urlDatabase = {
      "b2xVn2": { longURL: "http://www.lighthouselabs.ca", userID: "user1" },
      "9sm5xK": { longURL: "http://www.google.com", userID: "user2" }
    };

    const result = urlsForUser('user3', urlDatabase);
    assert.deepEqual(result, {});
  });

  it('should return an empty object if there are no urls in the urlDatabase', function() {
    const urlDatabase = {};

    const result = urlsForUser('user1', urlDatabase);
    assert.deepEqual(result, {});
  });

  it('should not return urls that do not belong to the specified user', function() {
    const urlDatabase = {
      "b2xVn2": { longURL: "http://www.lighthouselabs.ca", userID: "user1" },
      "9sm5xK": { longURL: "http://www.google.com", userID: "user2" }
    };

    const result = urlsForUser('user2', urlDatabase);
    const expectedOutput = {
      "9sm5xK": { longURL: "http://www.google.com", userID: "user2" }
    };

    assert.deepEqual(result, expectedOutput);
  });
});
