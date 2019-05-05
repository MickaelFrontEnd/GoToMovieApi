import { Router } from 'express';
import { insertMovies, updateMovies, deleteMovies, findMovies } from '../db/movies';
var ObjectID = require('mongodb').ObjectID;

const router = Router();

router.get('/', (req, res) => {
    const result = findMovies(req.body);
    result.then((item) => {
      res.send(item);
    });
});

router.get('/:id', (req, res) => {
  const criteria = { _id: ObjectID(req.params.id) };
  const result = findMovies(criteria);
  result.then((item) => {
    res.send(item);
  });
});

router.post('/', (req, res) => {
    const result = insertMovies(req.body);
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