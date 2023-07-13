const express = require('express');
const router = express.Router();
const validation = require('../middleware/validate');
const { auth, requiresAuth } = require('express-openid-connect');


const adminsController = require('../Controllers/admincontroller');

router.get('/', adminsController.getAllAdmins);

router.get('/:id', adminsController.getSingleAdmin);

router.post('/', requiresAuth(), adminsController.addAdmin);

router.put('/:id', adminsController.editAdmin);

router.delete('/:id', adminsController.deleteAdmin);

module.exports = router;