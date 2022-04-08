import { Router } from 'express';
import { userModel } from '../models/user.model.js';
import { addUser, getUserByUsername, comparePassword } from '../utils/crud.js';
import { baseConfig } from '../config/index.js';
import jwt from 'jsonwebtoken';

const router = Router();

router.post('/register', (req, res) => {
  let newUser = new userModel({
    username: req.body.username,
    password: req.body.password,
  });
  addUser(newUser, (err) => {
    if (err) {
      console.log(err);
      res.send(400);
    } else {
      console.log('sucess');
      res.json({ success: true, msg: 'User registered' });
    }
  });
});

router.post('/authenticate', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const getUser = getUserByUsername(userModel);
  getUser(username, (err, user) => {
    if (err) throw err;
    if (!user) {
      return res.json({ success: false, msg: 'Корисникот не е пронајден' });
    }

    comparePassword(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        const token = jwt.sign(user.toJSON(), baseConfig.secrets.jwt, {
          expiresIn: 86400,
        });
        res.json({
          success: true,
          token: 'JWT ' + token,
          user: { id: user._id, username: user.username },
        });
      } else {
        return res.json({ success: false, msg: 'Корисникот не е пронајден' });
      }
    });
  });
});

export default router;
