const User = require("../models/User");

async function createUser(username, hashedPassword) {
  //ADAPT TO REQUIREMENTS
  const user = new User({
    username,
    hashedPassword,
    likedPlays: []
  });
  await user.save();
  return user;
}
async function getUserByUsername(username) {
    const pattern = new RegExp(`^${username}$`, 'i')
  const user =  User.findOne({
    username: { $regex: pattern },
  });
  return user;
 
}
//TODO Add function for finding user by other properties, as specified in the project requirements

module.exports = {
  createUser,
  getUserByUsername,
};
