const express = require('express');
const router = express.Router();
const validation = require('../middleware/validate');

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
            npi: '6155382000'
          }
  } */
  validation.validatePatient, patientscontroller.createPatient);

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
            npi: '6155382000'
          }
  } */
  validation.validatePatient, patientscontroller.updatePatient);

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
  patientscontroller.deletePatient);

module.exports = router;