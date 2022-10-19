const jwt = require('jsonwebtoken');
const User = require('../models/User')

require('dotenv').config()

//Comparaison des token
module.exports.checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.TOKEN, async (err, Tokendecoded) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        let user = await User.findById(Tokendecoded.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

//Capture l'erreur en cas de Token non valide
exports.requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.TOKEN, async (err, Tokendecoded) => {
      if (err) {
        console.log(err);
        res.send(200).json('pas de token ici')
      } else {
        console.log(Tokendecoded.id);
        next();
      }
    });
  } else {
    console.log('Pas de token la');
  }
};