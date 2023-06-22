const mongodb = require('../Database/mongodbconnect');
const ObjectId = require('mongodb').ObjectId;

const getAllNurses = async (req, res, next) => {
  // #swagger.summary = 'Get All Nurses (WIP)'
  const result = await mongodb.getDb().db("Games").collection('games').find({});
  console.log(result);
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingleNurse = async (req, res) => {
  // #swagger.summary = 'Get Single Nurse by ID (WIP)'
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid id to find a game.');
  }

  const userId = new ObjectId(req.params.id);
  const result = await mongodb
  .getDb()
  .db("Games")
  .collection('games')
  .find({ _id: userId });
result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const getNursesByPatient = async (req, res) => {
  // #swagger.summary = 'Get Nurses by Patient ID (WIP)'
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid id to find a game.');
  }

  const userId = new ObjectId(req.params.id);
  const result = await mongodb
  .getDb()
  .db("Games")
  .collection('games')
  .find({ _id: userId });
result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const addNurse = async (req, res) => {
  // #swagger.summary = 'Add a Nurse (WIP)'
  const game = {
    title: req.body.title,
    releasedate: req.body.releasedate,
    developer: req.body.developer,
    publisher: req.body.publisher,
    rating: req.body.rating,
    played: req.body.played,
    score: req.body.score
  };
  const response = await mongodb.getDb().db("Games").collection('games').insertOne(game);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Error 500');
  }
};

const editNurse = async (req, res) => {
  // #swagger.summary = 'Edit Nurse Information (WIP)'
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid id to find a game.');
  }
  const userId = new ObjectId(req.params.id);
  const game = {
    title: req.body.title,
    releasedate: req.body.releasedate,
    developer: req.body.developer,
    publisher: req.body.publisher,
    rating: req.body.rating,
    played: req.body.played,
    score: req.body.score
  };
  const response = await mongodb.getDb().db("Games").collection('games').replaceOne({ _id: userId }, game);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Error 500');
  }
};

const deleteNurse = async (req, res) => {
  // #swagger.summary = 'Delete a Nurse (WIP)'
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid id to find a game.');
  }
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db("Games").collection('games').remove({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Error 500');
  }
};

module.exports = { getAllNurses, getSingleNurse, getNursesByPatient, addNurse, editNurse, deleteNurse };