const jwt = require('jsonwebtoken');
const db = require('../db');
const router = require('express').Router();
const cors = require('cors');
const expressJwt = require('express-jwt');
const express = require('express');

const jwtSecret = Buffer.from('Zn8Q5tyZ/G1MHltc4F/gTkVJMlrbKiZt', 'base64');
router.use(express.json());
router.use(express.urlencoded({
  extended: true
}));
router.use(cors(), expressJwt({
    secret: jwtSecret,
    credentialsRequired: false
  }));


router.post('/login', (req, res) => {
    const {email, password} = req.body;
    const user = db.users.list().find((user) => user.email === email);
    if (!(user && user.password === password)) {
      res.sendStatus(401);
      return;
    }
    const token = jwt.sign({sub: user.id}, jwtSecret);
    res.send({token});
  });

  module.exports = router;