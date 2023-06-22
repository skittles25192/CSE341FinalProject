const express = require('express');
const router = express.Router();
const validation = require('../middleware/validate');

const nursesController = require('../Controllers/nursescontroller');

router.get('/',
    // #swagger.tags = ['Nurses']
    nursesController.getAllNurses);

router.get('/:id', 
    // #swagger.tags = ['Nurses']
    nursesController.getSingleNurse);

router.get('/bypatient/:id',
    // #swagger.tags = ['Nurses']
    nursesController.getNursesByPatient);

router.post('/', 
    // #swagger.tags = ['Nurses']
    nursesController.addNurse);

router.put('/:id', 
    // #swagger.tags = ['Nurses']
    nursesController.editNurse);

router.delete('/:id', 
    // #swagger.tags = ['Nurses']
    nursesController.deleteNurse);

module.exports = router;