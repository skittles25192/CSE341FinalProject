const express = require('express');
const router = express.Router();
const validation = require('../middleware/validate');

const patientscontroller = require('../Controllers/patientscontroller');

router.post('/',
  // #swagger.tags = ['Patients']
  validation.validatePatient, patientscontroller.createPatient);

router.put('/:id',
  // #swagger.tags = ['Patients']
  validation.validatePatient, patientscontroller.updatePatient);

router.get('/:id',
  // #swagger.tags = ['Patients']
  patientscontroller.getById);

router.get('/byDoctor/:id',
  // #swagger.tags = ['Patients']
  patientscontroller.getByDr);

router.get('/byDiagnosis/:id',
  // #swagger.tags = ['Patients']
  patientscontroller.getByDx);

router.delete('/:id',
  // #swagger.tags = ['Patients']
  patientscontroller.deletePatient);

module.exports = router;