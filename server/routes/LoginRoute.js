const router = require('express').Router();
const jwt = require('jsonwebtoken');
const db = require('../db');

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