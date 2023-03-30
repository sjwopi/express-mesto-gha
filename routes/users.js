const router = require("express").Router();

const {
  getUsers,
  getUser,
  login,
  createUser,
  updateUserInfo,
  updateUserAvatar,
} = require("../controllers/users");
const {
  validateId,
  validateProfileInfo,
  validateAvatar,
  validateFormSignUp,
  validateFormSignIn
} = require("../utils/validatorsProfile");

router.get("/", getUsers);
router.get("/:userId", validateId, getUser);

router.post("/", validateProfileInfo, createUser);

router.patch("/me", updateUserInfo);
router.patch("/me/avatar", validateAvatar, updateUserAvatar);

//router.post('/signin', validateFormSignIn, login);
router.post('/signup', validateFormSignUp, createUser);

module.exports = router;
