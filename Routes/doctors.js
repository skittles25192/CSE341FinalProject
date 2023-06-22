const express = require('express');
const router = express.Router();
const validation = require('../middleware/validate');

const doctorsController = require('../Controllers/doctorscontroller');

router.get('/', doctorsController.getAll);

router.get('/:id', doctorsController.getSingle);

router.get('/bypatient/:id', doctorsController.getByPatient);

router.get('/isAvailable', doctorsController.getAvailable);

router.post('/', doctorsController.createDoctor);

router.put('/:id', doctorsController.updateDoctor);

router.delete('/:id', doctorsController.deleteDoctor);

module.exports = router;