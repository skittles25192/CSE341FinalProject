const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/patients', require('./patients'));
router.use('/doctors', require('./doctors'));
router.use('/nurses', require('./nurses'));
router.use('/admins', require('./admins'));


module.exports = router;