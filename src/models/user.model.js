import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

export const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export const user = mongoose.model('user', userSchema);

const getUserById = function (id, callback) {
  user.findById(id, callback);
};

const getUserByUsername = function (username, callback) {
  const query = { username: username };
  user.findOne(query, callback);
};

const addUser = function (newUser, callback) {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      newUser.password = hash;
      newUser.save(callback);
    });
  });
};

const comparePassword = function (password, hash, callback) {
  bcrypt.compare(password, hash, (err, isMatch) => {
    if (err) throw err;
    callback(null, isMatch);
  });
};

export default {
  getUserById,
  getUserByUsername,
  addUser,
  comparePassword,
};
