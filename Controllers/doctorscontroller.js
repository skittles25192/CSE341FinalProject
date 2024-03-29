const mongodb = require('../Database/mongodbconnect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
// #swagger.summary = 'Get all Doctors'
  const result = await mongodb.getDb().db("Hospital").collection('doctors').find({});
  try {
    lists = await result.toArray();
    if (!lists.length > 0) {
      throw new Error('No data found. Check if you have misspelled anything or add documents to the collection.');
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  } catch(error) {
    res.status(400).json(error.message || 'an error happened while getting posts');
  }
};

const getSingle = async (req, res) => {
// #swagger.summary = 'Get single Doctor by id'
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid id to find a doctor.');
  }

  const userId = new ObjectId(req.params.id);
  const result = await mongodb
  .getDb()
  .db("Hospital")
  .collection('doctors')
  .find({ _id: userId });
  try {
    lists = await result.toArray();
    if (!lists.length > 0) {
      throw new Error('No data found. Check if you have misspelled anything or add documents to the collection.');
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  } catch(error) {
    res.status(400).json(error.message || 'an error happened while getting posts');
  }
};

const getByPatient = async (req, res) => {
// #swagger.summary = 'Get doctor by Patient id'
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid id to find a doctor.');
  }

  const userId = new ObjectId(req.params.id);
  const patientResult = await mongodb
  .getDb()
  .db("Hospital")
  .collection('patients')
  .find({ _id: userId });
  try {
    patient = await patientResult.toArray();
    if (!patient.length > 0) {
      throw new Error('No data found. Check if you have misspelled anything or add documents to the collection.');
    }

    const result = await mongodb
    .getDb()
    .db("Hospital")
    .collection('doctors')
    .find({ npi: patient[0].npi });
    lists = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  } catch(error) {
    res.status(400).json(error.message || 'an error happened while getting posts');
  }
};

const getAvailable = async (req, res) => {
// #swagger.summary = 'Get by Availible'

  const result = await mongodb
  .getDb()
  .db("Hospital")
  .collection('doctors')
  .find({ isAvailable: "true" });
  try {
    lists = await result.toArray();
    if (!lists.length > 0) {
      throw new Error('No data found. Check if you have misspelled anything or add documents to the collection.');
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  } catch(error) {
    res.status(400).json(error.message || 'an error happened while getting posts');
  }
};



const createDoctor = async (req, res) => {
  // #swagger.summary = 'Create Doctor'
  const doctor = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    age: req.body.age,
    sex: req.body.sex,
    birthdate: req.body.birthdate,
    email: req.body.email,
    phone: req.body.phone,
    specialty: req.body.specialty,
    isAvailable: req.body.isAvailable,
    npi: req.body.npi
    
  };
  const response = await mongodb.getDb().db("Hospital").collection('doctors').insertOne(doctor);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Error 500');
  }
};

const updateDoctor = async (req, res) => {
  // #swagger.summary = 'Update Doctor'
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid id to find a doctor.');
  }
  const userId = new ObjectId(req.params.id);
  const doctor = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    age: req.body.age,
    sex: req.body.sex,
    birthdate: req.body.birthdate,
    email: req.body.email,
    phone: req.body.phone,
    specialty: req.body.specialty,
    isAvailable: req.body.isAvailable,
    npi: req.body.npi
  };
  const response = await mongodb.getDb().db("Hospital").collection('doctors').replaceOne({ _id: userId }, doctor);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Error 500');
  }
};

const deleteDoctor = async (req, res) => {
  // #swagger.summary = 'Delete Doctor'
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid id to delete a doctor.');
  }
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db("Hospital").collection('doctors').deleteOne({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Error 500');
  }
};

module.exports = { getAll, getSingle, getByPatient, getAvailable, createDoctor, updateDoctor, deleteDoctor };