const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/games', require('./games'));

module.exports = router;