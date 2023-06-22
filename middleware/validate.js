const validator = require('../helpers/validate');

const saveGame = (req, res, next) => {
  const validationRule = {
    title: 'required|string',
    releasedate: 'required|date',
    developer: 'required|string',
    publisher: 'required|string',
    rating: 'required|string',
    played: 'required|string',
    score: 'string'


  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveGame
};
