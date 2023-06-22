const express = require('express');
const router = express.Router();
const validation = require('../middleware/validate');

const adminsController = require('../Controllers/admincontroller');

router.get('/', adminsController.getAllAdmins);

router.get('/:id', adminsController.getSingleAdmin);

router.post('/', validation.adminVal, adminsController.addAdmin);

router.put('/:id', validation.adminVal, adminsController.editAdmin);

router.delete('/:id', adminsController.deleteAdmin);

module.exports = router;