const mongodb = require('../Database/mongodbconnect');
const ObjectId = require('mongodb').ObjectId;

const createPatient = async (req, res) => {
  // #swagger.summary = 'Create a new Patient'
    const patient = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      age: req.body.age,
      sex: req.body.sex,
      birthdate: req.body.birthdate,
      email: req.body.email,
      phone: req.body.phone,
      dxcode: req.body.dxcode,
      npi: req.body.npi,
      nurseId: new ObjectId(req.body.nurseId)

    };
    const response = await mongodb.getDb().db("Hospital").collection('patients').insertOne(patient);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Error 500');
    }
  };

    

  
  const updatePatient = async (req, res) => {
    // #swagger.summary = 'Update a Patient found by Id'
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid id to update a Patient.');
    }
    const userId = new ObjectId(req.params.id);
    const patient = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      age: req.body.age,
      sex: req.body.sex,
      birthdate: req.body.birthdate,
      email: req.body.email,
      phone: req.body.phone,
      dxcode: req.body.dxcode,
      npi: req.body.npi,
      nurseId: new ObjectId(req.body.nurseId)


    };
    const response = await mongodb.getDb().db("Hospital").collection('patients').replaceOne({ _id: userId }, patient);
    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Error 500');
    }
  };

  const getAll = async (req, res, next) => {
    // #swagger.summary = 'Get all Patients'
      const result = await mongodb.getDb().db("Hospital").collection('patients').find({});
      console.log(result);
      result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
      });
    };


const getById = async (req, res) => {
// #swagger.summary = 'Get a Patient with their Id'
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid id to find a patient.');
  }

  const userId = new ObjectId(req.params.id);
  const result = await mongodb
  .getDb()
  .db("Hospital")
  .collection('patients')
  .find({ _id: userId });
result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

  


const getByDr = async (req, res) => {
    // #swagger.summary = 'Get a Patient by their Doctor'

    const patients = req.params.npi;
    const result = await mongodb
    .getDb()
    .db("Hospital")
    .collection('patients')
    .find({ npi: patients });
  result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  };

    


  const getByDx = async (req, res) => {
    // #swagger.summary = 'Get a patient by their DX'

    const patients = req.params.dxcode;
    const result = await mongodb
    .getDb()
    .db("Hospital")
    .collection('patients')
    .find({ dxcode: patients });
  result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  };



const deletePatient = async (req, res) => {
      // #swagger.summary = 'Delete a patient by Id'
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid id to delete a patient.');
  }
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db("Hospital").collection('patients').deleteOne({_id: userId});
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Error 500');
  }
};

module.exports = { getById, createPatient, updatePatient, deletePatient, getByDr, getByDx, getAll };