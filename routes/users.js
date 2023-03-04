const router = require("express").Router();
const {
  getUsers,
  getUser,
  createUser,
  updateUserInfo,
  updateUserAvatar,
} = require("../controllers/users.js");

router.get("/", getUsers);
router.get("/:userId", getUser);

router.post("/", createUser);

router.patch("/me", updateUserInfo);
router.patch("/me/avatar", updateUserAvatar);

module.exports = router;
