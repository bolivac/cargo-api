import bcrypt from 'bcryptjs';
import pkg from 'mongodb';
const { ObjectId } = pkg;

import passport from 'passport';

export const getOne = (model) => (req, res) => {
  passport.authenticate('jwt')(req, res, function () {
    model.findOne({ _id: req.params.id }, (err, result) => {
      if (err) {
        res.status(404).end();
      } else {
        res.status(200).send(result);
      }
    });
  });
};

export const getHistory = (model) => (req, res) => {
  passport.authenticate('jwt')(req, res, function () {
    model.find({ ref: new ObjectId(req.params.id) }, (err, result) => {
      if (err) {
        res.status(404).end();
      } else {
        res.status(200).send(result);
      }
    });
  });
};

export const getMany = (model) => (req, res) => {
  passport.authenticate('jwt')(req, res, function () {
    model.find({}, (err, result) => {
      if (err) {
        res.status(404).end();
      } else {
        res.status(200).send(result);
      }
    });
  });
};

export const getManyShipments = (model) => (req, res) => {
  let { page, size, uid } = req.query;

  // Default page
  if (!page) {
    page = 1;
  }
  // Default size
  if (!size) {
    size = 10;
  }

  const limit = parseInt(size);
  const skip = (page - 1) * size;
  let collectionSize;

  model.count(function (err, count) {
    collectionSize = count;
  });

  passport.authenticate('jwt')(req, res, function () {
    if (uid) {
      model
        .find({ uid: uid }, (err, shipments) => {
          if (err) {
            res.status(404).end();
          } else {
            res.status(200).send({ page, size, shipments, collectionSize });
          }
        })
        .skip(skip)
        .limit(limit)
        .sort({ _id: -1 });
    } else {
      model
        .find({}, (err, shipments) => {
          if (err) {
            res.status(404).end();
          } else {
            res.status(200).send({ page, size, shipments, collectionSize });
          }
        })
        .skip(skip)
        .limit(limit)
        .sort({ _id: -1 });
    }
  });
};

export const createOne = (model) => (req, res) => {
  const doc = model.create({ ...req.body });
  passport.authenticate('jwt')(req, res, function () {
    return res.status(200).json(doc);
  });
};

export const updateOne = (model) => (req, res) => {
  passport.authenticate('jwt')(req, res, function () {
    model.findOneAndUpdate({ _id: req.params.id }, req.body, (err, result) => {
      if (err) {
        res.status(404).end();
      } else {
        res.status(200).send(result);
      }
    });
  });
};

export const removeOne = (model) => (req, res) => {
  passport.authenticate('jwt')(req, res, function () {
    model.findOneAndRemove({ _id: req.params.id }, (err, result) => {
      if (err) {
        res.status(404).end();
      } else {
        res.status(200).send(result);
      }
    });
  });
};

export const getUserById = (model) => (id, callback) => {
  model.findById(id, callback);
};

export const getUserByUsername = (model) => (username, callback) => {
  const query = { username: username };
  model.findOne(query, callback);
};

export const addUser = (newUser, callback) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      newUser.password = hash;
      newUser.save(callback);
    });
  });
};

export const comparePassword = (password, hash, callback) => {
  bcrypt.compare(password, hash, (err, isMatch) => {
    if (err) throw err;
    callback(null, isMatch);
  });
};

export const crudControllers = (model) => ({
  removeOne: removeOne(model),
  updateOne: updateOne(model),
  getMany: getMany(model),
  getManyShipments: getManyShipments(model),
  getOne: getOne(model),
  createOne: createOne(model),
  getHistory: getHistory(model),
});
