const mongodb = require('../Database/mongodbconnect');
const ObjectId = require('mongodb').ObjectId;

const getAllNurses = async (req, res, next) => {
  // #swagger.summary = 'Get All Nurses'
  const result = await mongodb.getDb().db("Hospital").collection('nurses').find({});
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

const getSingleNurse = async (req, res) => {
  // #swagger.summary = 'Get Single Nurse by ID'
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid id to find a nurse.');
  }

  const userId = new ObjectId(req.params.id);
  const result = await mongodb
  .getDb()
  .db("Hospital")
  .collection('nurses')
  .find({ _id: userId });
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

const getNursesByPatient = async (req, res) => {
  // #swagger.summary = 'Get Nurses by Patient ID'
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid id to find a nurse.');
  }

  const userId = new ObjectId(req.params.id);
  const result = await mongodb
  .getDb()
  .db("Hospital")
  .collection('nurses')
  .find({ _id: userId });
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

const addNurse = async (req, res) => {
  // #swagger.summary = 'Add a Nurse'
  const nurse = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    sex: req.body.sex,
    birthdate: req.body.birthdate,
    email: req.body.email,
    phone: req.body.phone,
    shift: req.body.shift
  };
  const response = await mongodb.getDb().db("Hospital").collection('nurses').insertOne(nurse);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Error 500');
  }
};

const editNurse = async (req, res) => {
  // #swagger.summary = 'Edit Nurse Information'
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid id to find a nurse.');
  }
  const userId = new ObjectId(req.params.id);
  const nurse = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    sex: req.body.sex,
    birthdate: req.body.birthdate,
    email: req.body.email,
    phone: req.body.phone,
    shift: req.body.shift
  };
  const response = await mongodb.getDb().db("Hospital").collection('nurses').replaceOne({ _id: userId }, nurse);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Error 500');
  }
};

const deleteNurse = async (req, res) => {
  // #swagger.summary = 'Delete a Nurse'
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid id to find a nurse.');
  }
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db("Hospital").collection('nurses').deleteOne({_id: userId});
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Error 500');
  }
};

module.exports = { getAllNurses, getSingleNurse, getNursesByPatient, addNurse, editNurse, deleteNurse };