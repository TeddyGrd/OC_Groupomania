const Post = require('../models/Post');
const User = require('../models/User')
const sharp = require("sharp")
const ObjectID = require("mongoose").Types.ObjectId;


exports.createPost = async (req, res, next) => {

    let fileName;

    if(req.file !== undefined) {
        fileName = req.body.posterId + Date.now() + ".jpg";


       await sharp(req.file.buffer)
        .toFile(`${__dirname}/../../front-end/public/uploads/posts/${fileName}`)
    }

    const newPost = new Post({
      posterId: req.body.posterId,
      post: req.body.message,
      picture: req.file !== undefined ? "./uploads/posts/" + fileName : "",
      likers:[],
    });
  
    try {
      const post =  newPost.save();
      return res.status(201).json(post);
    } catch (err) {
      return res.status(400).send(err);
    }
  };

exports.getAllPost = (req, res) => {
        Post.find((err, docs) => {
          if (!err) res.send(docs);
          else console.log("Error to get data : " + err);
        }).sort({ createdAt: -1 });
      };

exports.likePost = (req, res) => {
  console.log(req.body.id,"    ",req.params.id)
  let user = req.params.id
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    Post.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: { likers: req.body.id },
      },
      { new: true },
      (err, data) => {
        if (err) return res.status(400).send(err);
      }
    );
     User.findByIdAndUpdate(
      req.body.id,
      {
        $addToSet: { likes: user},
      },
      { new: true },
      (err, data) => {
        if (!err) res.send(data);
        else return res.status(400).send("erreur");
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};
exports.dislikePost = async (req, res) => {
  let user = req.params.id
  if (!ObjectID.isValid(req.params.id))
      return res.status(400).send('ID unknown :' + req.params.id);

      try {
          Post.findByIdAndUpdate(
            req.params.id,
            {
              $pull: { likers: req.body.id },
            },
            { new: true },
            (err, data) => {
              if (err) return res.status(400).send(err);
            }
          );
           User.findByIdAndUpdate(
            req.body.id,
            {
              $pull: { likes: user },
            },
            { new: true },
            (err, data) => {
              if (!err) res.send(data);
              else return res.status(400).send("erreur");
            }
          );
        } catch (err) {
          return res.status(400).send(err);
        }
};

exports.modifyPost = (req, res, next) => {
    if (!ObjectID.isValid(req.params.id))
      return res.status(400).send("ID inconnu");
  
    const updatedRecord = {
      message: req.body.message,
    };
  
    Post.findByIdAndUpdate(
      req.params.id,
      { $set: updatedRecord },
      { new: true },
      (err, data) => {
        if (!err) res.send(data);
        else console.log("Erreur");
      }
    );
  };
  
exports.deletePost = (req, res, next) => {
  Post.findOne({
  _id : req.params.id
}).then(post => {
    const filename = post.picture.split("/uploads/posts/")[1];
        fs.unlink(`${__dirname}/../../front-end/public/uploads/posts/${filename}`, () => {
            Post.deleteOne({ _id:req.params.id })
            .then(() => res.status(200).json({message: 'Objet supprimé !'}))
            .catch(error => res.status(400).json({error }));
        });
})
.catch(error => res.status(500).json({ error}));
  };
