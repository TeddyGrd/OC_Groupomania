const User = require('../models/User');
const jwt = require('jsonwebtoken');
const ObjectID = require("mongoose").Types.ObjectId;
const sharp = require("sharp")
const { signUpErrors,loginError,uploadErrors } = require('../utils/errors');

const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (id) => {
  return jwt.sign({id}, process.env.TOKEN, {
    expiresIn: maxAge
  })
};


exports.signUp = async (req, res) => {
    const {username, email, password} = req.body
  
    try {
      const user = await User.create({username, email, password });
      res.status(201).json({ user: user._id});
    }
    catch(err) {
      const errors = signUpErrors(err);
      res.status(200).send({ errors })
    }
  }

exports.login = async (req, res, next) => {

    const { email, password } = req.body

    try {
      const user = await User.login(email, password);
      const token = createToken(user._id);
      res.cookie('jwt', token, { httpOnly: true, maxAge});
      res.status(200).json({ user: user._id})
    } catch (err){
      const errors = loginError(err);
      res.status(200).json({ errors });
    }
  }

exports.logout = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/auth/login');
  }

exports.getAllUsers = async (req, res) => {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  };
  
exports.userInfo = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
      return res.status(400).send("ID unknown : " + req.params.id);
  
    User.findById(req.params.id, (err, docs) => {
      if (!err) res.send(docs);
      else console.log("ID unknown : " + err);
    }).select("-password");
  };


exports.userPicture = async (req,res) => {
    try {
      if (
        req.file.mimetype != "image/jpg" &&
        req.file.mimetype  != "image/png" &&
        req.file.mimetype  != "image/jpeg" 
      )
        throw Error("Format invalide");
    } catch (err) {
      const errors = uploadErrors(err);
      return res.status(400).json({ errors });
    }
    const fileName = req.body.username + ".jpg";
    
    try{
      await sharp(req.file.buffer)
      .resize({ width: 300, height: 300 })
      .toFile(`${__dirname}/../../front-end/public/uploads/profils/${fileName}`)
      res.status(201).send("Photo de profil chargé avec succés");
  } catch (err) {
    res.status(400).send(err);
  }

    try {
      await User.findByIdAndUpdate(
        req.body.userId,
          { $set: { imageUrl: "./uploads/profils/" + fileName } },
          { new: true, upsert: true, setDefaultsOnInsert: true })
          .then((data) => res.send(data))
          .catch((err) => res.status(500).send({ message: err }));
          
    } catch (err) {
      return res.status(500);
    }
  };

exports.deleteUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
      return res.status(400).send("Utilisateur inconnu") ;
  
    try {
      await User.remove({ _id: req.params.id }).exec();
      res.status(200).json({ message: "Utilisateur supprimé" });
    } catch (err) {
      return res.status(500).json({ message: err });
    }
  };

exports.UserUpdate = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
  return res.status(400).send("Utilisateur inconnu") ;

  try {
    await User.findByIdAndUpdate(
      req.params.id,
        { $set: { admin: "1"} })
        
      } catch (err) {
        return res.status(500).json({ message: err });
      }
}