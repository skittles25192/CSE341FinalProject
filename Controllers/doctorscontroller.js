const mongodb = require('../Database/mongodbconnect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
// #swagger.summary = 'Get all Doctors'
  const result = await mongodb.getDb().db("Hospital").collection('doctors').find({});
  console.log(result);
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res) => {
// #swagger.summary = 'Get single Doctor by id'
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid id to find a game.');
  }

  const userId = new ObjectId(req.params.id);
  const result = await mongodb
  .getDb()
  .db("Hospital")
  .collection('doctors')
  .find({ _id: userId });
result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const getByPatient = async (req, res) => {
// #swagger.summary = 'Get doctor by Patient id'
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid id to find a game.');
  }

  const userId = new ObjectId(req.params.id);
  const result = await mongodb
  .getDb()
  .db("Hospital")
  .collection('doctors')
  .find({ _id: userId });
result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const getAvailable = async (req, res) => {
// #swagger.summary = 'Get by Availible'
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid id to find a game.');
  }

  const userId = new ObjectId(req.params.id);
  const result = await mongodb
  .getDb()
  .db("Hospital")
  .collection('doctors')
  .find({ _id: userId });
result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createDoctor = async (req, res) => {
  // #swagger.summary = 'Create Doctor'
  const game = {
    title: req.body.title,
    releasedate: req.body.releasedate,
    developer: req.body.developer,
    publisher: req.body.publisher,
    rating: req.body.rating,
    played: req.body.played,
    score: req.body.score
  };
  const response = await mongodb.getDb().db("Hospital").collection('doctors').insertOne(game);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Error 500');
  }
};

const updateDoctor = async (req, res) => {
  // #swagger.summary = 'Update Doctor'
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
  const response = await mongodb.getDb().db("Hospital").collection('doctors').replaceOne({ _id: userId }, game);
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
    res.status(400).json('Must use a valid id to find a game.');
  }
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db("Hospital").collection('doctors').remove({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Error 500');
  }
};

module.exports = { getAll, getSingle, getByPatient, getAvailable, createDoctor, updateDoctor, deleteDoctor };