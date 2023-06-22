const express = require('express');
const router = express.Router();
const validation = require('../middleware/validate');

const contactsController = require('../Controllers/index');

router.get('/', contactsController.getAll);

router.get('/:id', contactsController.getSingle);

router.post('/', validation.saveGame, contactsController.createGame);

router.put('/:id', validation.saveGame, contactsController.updateGame);

router.delete('/:id', contactsController.deleteGame);

module.exports = router;