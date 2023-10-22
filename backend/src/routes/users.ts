import bcrypt from 'bcrypt';
/*

Copyright (c) 2019 - present AppSeed.us

*/
import express from 'express';
import Joi from 'joi';
import jwt from 'jsonwebtoken';

import { checkToken } from '../config/safeRoutes';
import ActiveSession from '../models/activeSession';
import User from '../models/user';
import { connection } from '../server/database';
import { logoutUser } from '../controllers/logout.controller';

// eslint-disable-next-line new-cap
const router = express.Router();
// Route: <HOST>:PORT/api/users/

const userSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  username: Joi.string().alphanum().min(4).max(255)
    .optional(),
  password: Joi.string().required(),
  cnpj: Joi.string().optional(),
  usertype: Joi.string().required(),
  adress: Joi.string().optional(),
  adress_number: Joi.number().optional(),
  city: Joi.string().optional(),
});

const userLoginSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

router.post('/register', (req, res) => {
  // Joy Validation
  const result = userSchema.validate(req.body);
  if (result.error) {
    res.status(422).json({
      success: false,
      msg: `Cadastro Realizado com Sucesso!`,
    });
    return;
  }

  const {email, username, password, cnpj, usertype, adress, adress_number, city} = req.body;

  const userRepository = connection!.getRepository(User);

  userRepository.findOne({ email }).then((user) => {
    if (user) {
      res.json({ success: false, msg: 'Email already exists' });
    } else {
      bcrypt.genSalt(10, (_err, salt) => {
        bcrypt.hash(password, salt).then((hash) => {
          const user = new User()
          user.email = email
          user.username = username
          user.password = hash
          user.cnpj = cnpj
          user.user_type = usertype
          user.adress = adress
          user.adress_number = adress_number
          user.city = city
          userRepository.save(user).then((u) => {
            res.json({ success: true, userID: u.id, msg: 'The user was successfully registered' });
          });
        });
      });
    }
  });
});

router.post('/login', (req, res) => {
  // Joy Validation
  const result = userLoginSchema.validate(req.body);
  if (result.error) {
    res.status(422).json({
      success: false,   
      msg: `Validation err: ${result.error.details[0].message}`,
    });
    return;
  }

  const { email, password } = req.body;

  const userRepository = connection!.getRepository(User);
  const activeSessionRepository = connection!.getRepository(ActiveSession);
  userRepository.findOne({ email }).then((user) => {
    if (!user) {
      console.log(user)
      return res.json({ success: false, msg: 'Wrong credentials' });
    }

    if (!user.password) {
      return res.json({ success: false, msg: 'No password' });
    }

    bcrypt.compare(password, user.password, (_err2, isMatch) => {
      if (isMatch) {
        if (!process.env.SECRET) {
          throw new Error('SECRET not provided');
        }

        const token = jwt.sign({
          id: user.id,
          username: user.username,
          email: user.email,
        }, process.env.SECRET, {
          expiresIn: 86400, // 1 week
        });

        const query = { userId: user.id, token };

        activeSessionRepository.save(query);
        // Delete the password (hash)
        (user as { password: string | undefined }).password = undefined;
        return res.json({
          success: true,
          token,
          user,
        });
      }
      return res.json({ success: false, msg: 'Wrong credentials' });
    });
  });
});

router.post('/logout', checkToken, logoutUser);

router.post('/checkSession', checkToken, (_req, res) => {
  res.json({ success: true });
});

router.post('/all', checkToken, (_req, res) => {
  const userRepository = connection!.getRepository(User);

  userRepository.find({}).then((users) => {
    users = users.map((item) => {
      const x = item;
      (x as { password: string | undefined }).password = undefined;
      return x;
    });
    res.json({ success: true, users });
  }).catch(() => res.json({ success: false }));
});

router.post('/edit', checkToken, (req, res) => {
  const { userID, username, email } = req.body;

  const userRepository = connection!.getRepository(User);

  userRepository.find({ id: userID }).then((user) => {
    if (user.length === 1) {
      const query = { id: user[0].id };
      const newvalues = { username, email };
      userRepository.update(query, newvalues).then(
        () => {
          res.json({ success: true });
        },
      ).catch(() => {
        res.json({ success: false, msg: 'There was an error. Please contract the administrator' });
      });
    } else {
      res.json({ success: false, msg: 'Error updating user' });
    }
  });
});

// Used for tests (nothing functional)
router.get('/testme', (_req, res) => {
  res.status(200).json({ success: true, msg: 'all good' });
});

export default router;
