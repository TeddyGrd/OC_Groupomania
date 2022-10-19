const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const {checkUser, requireAuth} = require('./middleware/auth');
const cors = require("cors");
const cookieParser = require('cookie-parser');

require('dotenv').config()

mongoose.connect(process.env.MONGO_URI,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


const app = express();


const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  'allowedHeaders': ['sessionId', 'Content-Type'],
  'exposedHeaders': ['sessionId'],
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
}
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req, res) => {res.status(200).send(res.locals.user._id)});
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);

module.exports = app;