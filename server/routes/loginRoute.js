const jwt = require('jsonwebtoken');
const db = require('../db');
const router = require('express').Router();
const cors = require('cors');
const expressJwt = require('express-jwt');
const bodyParser = require('body-parser');

const jwtSecret = Buffer.from('Zn8Q5tyZ/G1MHltc4F/gTkVJMlrbKiZt', 'base64');
router.use(cors(), bodyParser(), expressJwt({
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