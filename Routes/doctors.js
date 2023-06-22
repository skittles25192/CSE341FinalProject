const express = require('express');
const router = express.Router();
const validation = require('../middleware/validate');

const doctorsController = require('../Controllers/doctorscontroller');

router.get('/',
        // #swagger.tags = ['Doctors']
        doctorsController.getAll);

router.get('/:id', 
    // #swagger.tags = ['Doctors']
    doctorsController.getSingle);

router.get('/bypatient/:id',
    // #swagger.tags = ['Doctors']
    doctorsController.getByPatient);

router.get('/isAvailable', 
    // #swagger.tags = ['Doctors']
    doctorsController.getAvailable);

router.post('/',
    // #swagger.tags = ['Doctors']
    doctorsController.createDoctor);

router.put('/:id', 
    // #swagger.tags = ['Doctors']
    doctorsController.updateDoctor);

router.delete('/:id', 
    // #swagger.tags = ['Doctors']
    doctorsController.deleteDoctor);

module.exports = router;