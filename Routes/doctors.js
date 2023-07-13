const express = require('express');
const router = express.Router();
const validation = require('../middleware/validate');
const {requiresAuth } = require('express-openid-connect');


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
    /*  #swagger.parameters['body'] = {
          in: 'body',
          description: 'Add a new doctor to the database',
          schema: {
			$firstName: 'John',
			$lastName: 'Doe',
			$sex: 'Male',
			$birthdate: '01/01/1986',
			$email: 'johndoe@example.com',
			$phone: '123-456-7890',
			$specialty: 'Cardiology',
			$isAvailable: 'true',
			$npi: '1234567890'
          }
  } */
  requiresAuth(),  validation.validateDoctor, doctorsController.createDoctor);
    
router.put('/:id', 
    // #swagger.tags = ['Doctors']
    /*  #swagger.parameters['body'] = {
          in: 'body',
          description: 'Update a doctor in the database.',
          schema: {
			firstName: 'John',
			lastName: 'Doe',
			sex: 'Male',
			birthdate: '01/01/1986',
			email: 'johndoe@example.com',
			phone: '123-456-7890',
			specialty: 'Cardiology',
			isAvailable: 'true',
			npi: '1234567890'
          }
  } */
   requiresAuth(), validation.validateDoctor, doctorsController.updateDoctor);

router.delete('/:id', 
    // #swagger.tags = ['Doctors']
    doctorsController.deleteDoctor);

module.exports = router;