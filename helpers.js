
const getUserByEmail = (email, users) => {
  for (let userID in users) {
    if (users[userID].email === email) {
      return users[userID];
    }
  }
  return undefined; 
};

module.exports = { getUserByEmail };

