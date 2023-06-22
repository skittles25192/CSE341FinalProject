const mongodb = require('../Database/mongodbconnect');
const ObjectId = require('mongodb').ObjectId;

const getAllAdmins = async (req, res, next) => {
    // #swagger.tags = ['Admins']
    // #swagger.summary = 'Get All Administrators (WIP)'
  const result = await mongodb.getDb().db("Games").collection('games').find({});
  console.log(result);
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingleAdmin = async (req, res) => {
    // #swagger.tags = ['Admins']
    // #swagger.summary = 'Get Single Administrator by ID (WIP)'
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

const addAdmin = async (req, res) => {
    // #swagger.tags = ['Admins']
    // #swagger.summary = 'Add Administrator (WIP)'
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

const editAdmin = async (req, res) => {
    // #swagger.tags = ['Admins']
    // #swagger.summary = 'Edit Administrator Information (WIP)'
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

const deleteAdmin = async (req, res) => {
    // #swagger.tags = ['Admins']
    // #swagger.summary = 'Delete Administrator (WIP)'
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

module.exports = { getAllAdmins, getSingleAdmin, addAdmin, editAdmin, deleteAdmin };