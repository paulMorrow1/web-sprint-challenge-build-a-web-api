// Write your "projects" router here!
const express = require("express");
const router = express.Router();
const Projects = require("./projects-model");
const { hasPayload, hasProperty } = require("./projects-middleware");

router.get("/", (req, res) => {
  Projects.get()
    .then((project) => {
      res.json(project);
    })
    .catch((err) => {
      res.status(404).json({ message: err.message });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  Projects.get(id)
    .then((project) => {
      if (project) {
        res.json(project);
      } else {
        res.status(404).json({ message: `No project with id: ${id} found` });
      }
    })
    .catch(() => {
      res
        .status(404)
        .json({ message: `Error fetching project with id: ${id}` });
    });
});

router.post(
  "/",
  hasPayload,
  hasProperty("name"),
  hasProperty("description"),
  (req, res) => {
    const projectObj = req.body;
    Projects.insert(projectObj)
      .then((project) => {
        res.json(project);
      })
      .catch(() => {
        res.status(400).json({ message: "failed to create new project" });
      });
  }
);

router.put(
  "/:id",
  hasPayload,
  hasProperty("name"),
  hasProperty("description"),
  hasProperty("completed"),
  (req, res) => {
    const { id } = req.params;
    const projectObj = req.body;
    Projects.update(id, projectObj)
      .then((project) => {
        res.json(project);
      })
      .catch(() => {
        res.status(400).json({ message: "failed to update project" });
      });
  }
);

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  Projects.remove(id)
    .then((wasProjectDeleted) => {
      if (wasProjectDeleted) {
        res.json(wasProjectDeleted);
      } else {
        res.status(404).json({ message: `No project with id: ${id} found` });
      }
    })
    .catch(() => {
      res
        .status(404)
        .json({ message: `Error deleting project with id: ${id}` });
    });
});

router.get("/:id/actions", (req, res) => {
  const { id } = req.params;
  Projects.getProjectActions(id)
    .then((project) => {
      res.json(project);
    })
    .catch(() => {
      res.status(404).json({ message: "Failed to fetch actions for id" });
    });
});

module.exports = router;
