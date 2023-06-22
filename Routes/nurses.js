const express = require('express');
const router = express.Router();
const validation = require('../middleware/validate');

const nursesController = require('../Controllers/nursescontroller');

router.get('/', nursesController.getAllNurses);

router.get('/:id', nursesController.getSingleNurse);

router.get('/bypatient/:id', nursesController.getNursesByPatient);

router.post('/', validation.nurseVal, nursesController.addNurse);

router.put('/:id', validation.nurseVal, nursesController.editNurse);

router.delete('/:id', nursesController.deleteNurse);

module.exports = router;