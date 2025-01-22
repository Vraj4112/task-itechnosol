const express = require("express");
const router = express.Router();
const {
  createTask,
  getTask,
  updateTask,
  deleteTask,
  getAllTasksForProject,
} = require("./controller");
const {
  validateTaskCreation,
  validateTaskId,
  validateProjectId,
} = require("./validator");

router.post("/", validateTaskCreation, createTask);
router.get("/:id", validateTaskId, getTask);
router.put("/:id", validateTaskId, updateTask);
router.delete("/:id", validateTaskId, deleteTask);
router.get("/:projectId/tasks", validateProjectId, getAllTasksForProject);

module.exports = router;
