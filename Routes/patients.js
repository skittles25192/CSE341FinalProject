const express = require('express');
const router = express.Router();
const validation = require('../middleware/validate');
const {requiresAuth } = require('express-openid-connect');


const patientscontroller = require('../Controllers/patientscontroller');

router.post('/',
  // #swagger.tags = ['Patients']
  /*  #swagger.parameters['body'] = {
          in: 'body',
          description: 'Add a new patient to the database.',
          schema: {
            $firstName: 'John',
            $lastName: 'Doe',
            $sex: 'M',
            $birthdate: '10/10/1997',
            $email: 'email@email.com',
            $phone: '555-555-5555',
            dxcode: 'R41. 3',
            npi: '1234567890'
            nurseId: '64b570b1450cf9dd3935c385'

          }
  } */
  requiresAuth(), validation.validatePatient, patientscontroller.createPatient);

router.put('/:id',
  // #swagger.tags = ['Patients']
  /*  #swagger.parameters['body'] = {
          in: 'body',
          description: 'Update a patient in the database.',
          schema: {
            firstName: 'John',
            lastName: 'Doe',
            sex: 'M',
            birthdate: '10/10/1997',
            email: 'email@email.com',
            phone: '555-555-5555',
            dxcode: 'R41. 3',
            npi: '1234567890'
            nurseId: '64b570b1450cf9dd3935c385'

          }
  } */
  requiresAuth(), validation.validatePatient, patientscontroller.updatePatient);

router.get('/',
  // #swagger.tags = ['Patients']
  patientscontroller.getAll);

router.get('/:id',
  // #swagger.tags = ['Patients']
  patientscontroller.getById);

router.get('/byDoctor/:npi',
  // #swagger.tags = ['Patients']
  validation.validateNPI, patientscontroller.getByDr);

router.get('/byDiagnosis/:dxcode',
  // #swagger.tags = ['Patients']
  patientscontroller.getByDx);

router.delete('/:id',
  // #swagger.tags = ['Patients']
 requiresAuth(), patientscontroller.deletePatient);

module.exports = router;