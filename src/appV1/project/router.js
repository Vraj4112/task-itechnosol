const express = require("express");
const router = express.Router();
const {
  createProject,
  getProject,
  updateProject,
  deleteProject,
  getAllProjectsForUser,
} = require("./controller");
const {
  validateProjectCreation,
  validateProjectId,
  validateUserId,
} = require("./validator");

router.post("/", validateProjectCreation, createProject);
router.get("/:id", validateProjectId, getProject);
router.put("/:id", validateProjectId, updateProject);
router.delete("/:id", validateProjectId, deleteProject);
router.get("/:userId/projects", validateUserId, getAllProjectsForUser);

module.exports = router;
