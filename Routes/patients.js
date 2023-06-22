const express = require('express');
const router = express.Router();
const validation = require('../middleware/validate');

const patientscontroller = require('../Controllers/patientscontroller');

router.post('/', patientscontroller.createPatient);

router.put('/:id', patientscontroller.updatePatient);

router.get('/:id', patientscontroller.getById);

router.get('/:id', patientscontroller.getByDr);

router.get('/:id', patientscontroller.getByDx);

router.delete('/:id', patientscontroller.deletePatient);

module.exports = router;