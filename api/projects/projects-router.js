// Write your "projects" router here!
const express = require("express");
const router = express.Router();
const Projects = require("./projects-model");

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

router.post("/", (req, res) => {
  const projectObj = req.body;
  if (projectObj) {
    if (
      projectObj.hasOwnProperty("name") &&
      projectObj.hasOwnProperty("description")
    ) {
      Projects.insert(projectObj)
        .then((project) => {
          res.json(project);
        })
        .catch(() => {
          res.status(400).json({ message: "failed to create new project" });
        });
    } else {
      res
        .status(400)
        .json({ message: "'Name' & 'Description' fields are required" });
    }
  } else {
    res.status(400).json({ message: "missing name and description" });
  }
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const projectObj = req.body;
  if (projectObj) {
    if (
      projectObj.hasOwnProperty("name") &&
      projectObj.hasOwnProperty("description") &&
      projectObj.hasOwnProperty("completed")
    ) {
      Projects.update(id, projectObj)
        .then((project) => {
          res.json(project);
        })
        .catch(() => {
          res.status(400).json({ message: "failed to update project" });
        });
    } else {
      res.status(400).json({
        message: "'Name' & 'Description' & 'Completed' fields are required",
      });
    }
  } else {
    res.status(400).json({ message: "send me yo data homie" });
  }
});

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
