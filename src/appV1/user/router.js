const express = require("express");
const router = express.Router();
const {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
} = require("./controller");
const { validateUserCreation, validateUserId } = require("./validator");

router.post("/", validateUserCreation, createUser);
router.get("/", getAllUsers);
router.put("/:id", validateUserId, updateUser);
router.delete("/:id", validateUserId, deleteUser);

module.exports = router;
