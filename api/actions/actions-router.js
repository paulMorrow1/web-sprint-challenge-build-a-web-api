// Write your "actions" router here!

const express = require("express");
const router = express.Router();
const Actions = require("./actions-model");
const { hasPayload, hasProperty } = require("./actions-middlware");

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

router.post(
  "/",
  hasPayload,
  hasProperty("notes"),
  hasProperty("description"),
  (req, res) => {
    const newAction = req.body;
    Actions.insert(newAction)
      .then((newAction) => {
        res.json(newAction);
      })
      .catch(() => {
        res.status(400).json({ message: `Failed to create new action` });
      });
  }
);

router.put(
  "/:id",
  hasPayload,
  hasProperty("notes"),
  hasProperty("description"),
  hasProperty("project_id"),
  (req, res) => {
    const { id } = req.params;
    const newAction = req.body;
    Actions.update(id, newAction)
      .then((action) => {
        res.json(action);
      })
      .catch(() => {
        res.status(400).json({ message: `Error updating the action` });
      });
  }
);

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  Actions.remove(id)
    .then((wasActionDeleted) => {
      if (wasActionDeleted) {
        res.json(wasActionDeleted);
      } else {
        res
          .status(400)
          .json({ message: `could not find action with id: ${id}` });
      }
    })
    .catch(() => {
      res
        .status(400)
        .json({ message: `could not delete action with id: ${id}` });
    });
});

module.exports = router;
