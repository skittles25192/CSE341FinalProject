const { createPatient } = require('../Controllers/patientscontroller');
const validator = require('../helpers/validate');

const validateDoctor = (req, res, next) => {
  const validationRule = {
    firstName: 'required|string',
    lastName: 'required|string',
    sex: 'required|string',
    birthdate: 'required|date',
    email: 'required|email',
    phone: 'required|string',
    specialty: 'required|string',
    isAvailable: 'required|boolean',
    npi: 'required|integer|digits:10'
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


const validateNPI = (req, res, next) => {
  const validationRule = {
    npi: 'required|integer|digits:10'
  };

  validator(req.params, validationRule, {}, (err, status) => {
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


const validatePatient = (req, res, next) => {
  const validationRule = {
    firstName: 'required|string',
    lastName: 'required|string',
    sex: 'required|string',
    birthdate: 'required|date',
    email: 'required|email',
    phone: 'required|string',
    dxcode: 'required|string',
    npi: 'integer|digits:10'
  };

  validator(req.body, validationRule, {}, (err, status) => {
    console.log(req.body)

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

const validateNurse = (req, res, next) => {
  const validationRule = {
    firstName: 'required|string',
    lastName: 'required|string',
    sex: 'required|string',
    birthdate: 'required|date',
    email: 'required|email',
    phone: 'required|string',
    shift: 'required|string'
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

const validateAdministrator = (req, res, next) => {
  const validationRule = {
    firstName: 'required|string',
    lastName: 'required|string',
    sex: 'required|string',
    birthdate: 'required|date',
    email: 'required|email',
    phone: 'required|string',
    securityLevel: 'required|int'
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

// const validateIsMongoDBID = (req, res, next) => {
//   if (!ObjectId.isValid(req.params.id)) {
//     res.status(400).json('Must use a valid ID.');
//   }
// }

module.exports = {
  validateDoctor, validatePatient, validateNPI, validateAdministrator, validateNurse,
};
