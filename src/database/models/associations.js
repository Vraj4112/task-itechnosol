const Task = require("./task");
const Project = require("./project");
const User = require("./user");

const initAssociations = async () => {
  User.hasMany(Project, { foreignKey: "userId" });
  Project.belongsTo(User, { foreignKey: "userId" });

  Project.hasMany(Task, { foreignKey: "projectId" });
  Task.belongsTo(Project, { foreignKey: "projectId" });

  User.beforeDestroy(async (user) => {
    const projectsCount = await Project.count({ where: { userId: user.id } });
    if (projectsCount > 0) {
      throw new Error("Cannot delete user with existing projects");
    }
  });

  Project.beforeDestroy(async (project) => {
    const tasksCount = await Task.count({
      where: { projectId: project.id, status: "pending" },
    });
    if (tasksCount > 0) {
      throw new Error("Cannot delete project with pending tasks");
    }
  });
};

module.exports = initAssociations;
