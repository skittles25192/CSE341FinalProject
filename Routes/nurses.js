const express = require('express');
const router = express.Router();
const validation = require('../middleware/validate');
const {requiresAuth } = require('express-openid-connect');


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
  /*  #swagger.parameters['body'] = {
          in: 'body',
          description: 'Add a new nurse to the database',
          schema: {
			$firstName: 'John',
			$lastName: 'Doe',
			$sex: 'Male',
			$birthdate: '01/01/1986',
			$email: 'johndoe@example.com',
			$phone: '123-456-7890',
			$shift: 'Day'
          }
  } */
  requiresAuth(),  nursesController.addNurse);

router.put('/:id', 
    // #swagger.tags = ['Nurses']
  /*  #swagger.parameters['body'] = {
          in: 'body',
          description: 'Update a nurse in the database',
          schema: {
			$firstName: 'John',
			$lastName: 'Doe',
			$sex: 'Male',
			$birthdate: '01/01/1986',
			$email: 'johndoe@example.com',
			$phone: '123-456-7890',
			$shift: 'Day'
          }
  } */
   requiresAuth(), nursesController.editNurse);

router.delete('/:id', 
    // #swagger.tags = ['Nurses']
   requiresAuth(), nursesController.deleteNurse);

module.exports = router;