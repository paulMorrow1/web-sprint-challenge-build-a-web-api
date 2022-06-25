// Write your "actions" router here!

const express = require("express");
const router = express.Router();
const Actions = require("./actions-model");

router.get("/", (req, res) => {
  Actions.get()
    .then((action) => {
      res.json(action);
    })
    .catch(() => {
      res.status(404).json({ message: "Could not retrieve the action" });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  Actions.get(id)
    .then((action) => {
      if (action) {
        res.json(action);
      } else {
        res
          .status(404)
          .json({ message: `action with id ${id} does not exist` });
      }
    })
    .catch(() => {
      res.status(404).json({ message: `Error fetching action with id: ${id}` });
    });
});

router.post("/", (req, res) => {
  const newAction = req.body;
  if (
    newAction.hasOwnProperty("notes") &&
    newAction.hasOwnProperty("description") &&
    newAction.hasOwnProperty("project_id")
  ) {
    Actions.insert(newAction)
      .then((newAction) => {
        res.json(newAction);
      })
      .catch(() => {
        res.status(404).json({ message: `Failed to create new action` });
      });
  } else {
    res
      .status(400)
      .json({ message: `Missing notes, description, and project_id` });
  }
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const newAction = req.body;
  if (
    newAction.hasOwnProperty("notes") &&
    newAction.hasOwnProperty("description") &&
    newAction.hasOwnProperty("project_id")
  ) {
    Actions.update(id, newAction)
      .then((action) => {
        res.json(action);
      })
      .catch(() => {
        res.status(404).json({ message: `Error updating the action` });
      });
  } else {
    res.status(400).json({ message: `please enter required fields` });
  }
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  Actions.remove(id)
    .then((wasActionDeleted) => {
      if (wasActionDeleted) {
        res.json(wasActionDeleted);
      } else {
        res
          .status(404)
          .json({ message: `could not find action with id: ${id}` });
      }
    })
    .catch(() => {
      res
        .status(404)
        .json({ message: `could not delete action with id: ${id}` });
    });
});

module.exports = router;
