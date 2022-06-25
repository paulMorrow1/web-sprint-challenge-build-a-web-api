// add middlewares here related to projects

const hasPayload = (req, res, next) => {
  const projectObj = req.body;
  if (projectObj) {
    next();
  } else {
    res.status(400).json({ message: "send me yo data homie" });
  }
};

const hasProperty = (property) => (req, res, next) => {
  const projectObj = req.body;
  if (projectObj.hasOwnProperty(property)) {
    next();
  } else {
    res.status(400).json({ message: `missing ${property} property` });
  }
};

module.exports = {
  hasPayload,
  hasProperty,
};
