// add middlewares here related to actions

const hasPayload = (req, res, next) => {
  const actionObj = req.body;
  if (actionObj) {
    next();
  } else {
    res.status(400).json({ message: `enter fields` });
  }
};

const hasProperty = (property) => (req, res, next) => {
  const actionObj = req.body;
  if (actionObj.hasOwnProperty(property)) {
    next();
  } else {
    res.status(400).json({ message: `Missing ${property} property` });
  }
};

module.exports = {
  hasPayload,
  hasProperty,
};
