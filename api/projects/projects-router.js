// Write your "projects" router here!
const Projects = require("./projects-model");

const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  Projects.get()
    .then((project) => {
      res.json(project);
    })
    .catch((err) => {
      res.json({ message: err.message });
    });
});

router.get("/:id", (req, res) => {
  const project = req.params.id;
  if (project) {
    res.json(project);
  }
  res.status(404).json({
    message: `project with id does not exist`,
  });
});

router.post("/api/projects", (req, res) => {});

router.put("/api/projects/:id", (req, res) => {});

router.delete("/api/projects/:id", (req, res) => {});

router.get("/api/projects/:id/actions", (req, res) => {});

module.exports = router;
