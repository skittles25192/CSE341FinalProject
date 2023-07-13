const mongodb = require('../Database/mongodbconnect');
const ObjectId = require('mongodb').ObjectId;

const getAllAdmins = async (req, res, next) => {
    // #swagger.tags = ['Admins']
    // #swagger.summary = 'Get All Administrators (WIP)'
  const result = await mongodb.getDb().db("Hospital").collection('admins').find({});
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

const getSingleAdmin = async (req, res) => {
    // #swagger.tags = ['Admins']
    // #swagger.summary = 'Get Single Administrator by ID (WIP)'
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid id to find an admin.');
  }

  const userId = new ObjectId(req.params.id);
  const result = await mongodb
  .getDb()
  .db("Hospital")
  .collection('admins')
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

const addAdmin = async (req, res) => {
    // #swagger.tags = ['Admins']
    // #swagger.summary = 'Add Administrator (WIP)'
    /*  #swagger.parameters['body'] = {
          in: 'body',
          description: 'Add a new Administrator to the database',
          schema: {
			$firstName: 'John',
			$lastName: 'Doe',
			$sex: 'Male',
			$birthdate: '01/01/1986',
			$email: 'johndoe@example.com',
			$phone: '123-456-7890',
			$department: 'IT',
			$securityLevel: 1
          }
  } */
    
  const admin = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    sex: req.body.sex,
    birthdate: req.body.birthdate,
    email: req.body.email,
    phone: req.body.phone,
    securityLevel: req.body.securityLevel
  };
  const response = await mongodb.getDb().db("Hospital").collection('admins').insertOne(admin);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Error 500');
  }
};

const editAdmin = async (req, res) => {
    // #swagger.tags = ['Admins']
    // #swagger.summary = 'Edit Administrator Information (WIP)'
    /*  #swagger.parameters['body'] = {
          in: 'body',
          description: 'Update an administrator in the database.',
          schema: {
			$firstName: 'John',
			$lastName: 'Doe',
			$sex: 'Male',
			$birthdate: '01/01/1986',
			$email: 'johndoe@example.com',
			$phone: '123-456-7890',
			$department: 'IT',
			$securityLevel: 1
          }
  } */
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid id to find an Admin.');
  }
  const userId = new ObjectId(req.params.id);
  const admin = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    sex: req.body.sex,
    birthdate: req.body.birthdate,
    email: req.body.email,
    phone: req.body.phone,
    securityLevel: req.body.securityLevel
  };
  const response = await mongodb.getDb().db("Hospital").collection('admins').replaceOne({ _id: userId }, admin);
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
    res.status(400).json('Must use a valid id to find an Admin.');
  }
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db("Hospital").collection('admins').deleteOne({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Error 500');
  }
};

module.exports = { getAllAdmins, getSingleAdmin, addAdmin, editAdmin, deleteAdmin };