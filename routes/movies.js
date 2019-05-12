var multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/movies');
  },
  filename: function (req, file, cb) {
    let s = file.originalname.split('.');
    cb(null, req.body.movieTitle + '-' + Date.now() + '.' + s[s.length - 1]);
  }
})

var upload = multer({ storage: storage })

import { Router } from 'express';
import { insertMovies, updateMovies, deleteMovies, findMovies } from '../db/movies';
var ObjectID = require('mongodb').ObjectID;

const router = Router();

router.get('/', (req, res) => {
    const result = findMovies(req.query);
    result.then((item) => {
      res.send(item);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.get('/:id', (req, res) => {
  const criteria = { _id: ObjectID(req.params.id) };
  const result = findMovies(criteria);
  result.then((item) => {
    res.send(item);
  });
});

router.post('/', upload.single('moviePic'), (req, res) => {
    const movie = {
      movieTitle: req.body.movieTitle,
      movieDescription: req.body.movieDescription,
      movieLanguage: req.body.movieLanguage,
      movieType: req.body.movieType,
      movieActor: req.body.movieActor,
      movieDirector: req.body.movieDirector,
      movieTrailer: req.body.movieTrailer,
      moviePic: req.file.filename
    };
    const result = insertMovies(movie);
    res.send({
      status: 'success'
    });
});

router.put('/',(req, res) => {
  const result = updateMovies(req.body);
  res.send({
    status: 'success'
  });
});

router.delete('/',(req, res) => {
  const result = deleteMovies(req.body);
  res.send({
    status: 'success'
  });
});

export default router;
