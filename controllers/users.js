const { getUsers } = require("./users/getUsers");
const { getUser } = require("./users/getUser");
const { updateUserInfo } = require("./users/updateUserInfo");
const { updateUserAvatar } = require("./users/updateUserAvatar");
const { createUser } = require("./users/createUser");

module.exports = {
  getUsers,
  getUser,
  updateUserInfo,
  updateUserAvatar,
  createUser,
};

