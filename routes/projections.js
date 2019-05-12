import { Router } from 'express';
import { insertProjection, updateProjection, deleteProjection, findProjection } from '../db/projections';
var ObjectID = require('mongodb').ObjectID;

const router = Router();

router.get('/', (req, res) => {
    const result = findProjection(req.query);
    result.then((item) => {
      res.send(item);
    });
});

router.get('/:id', (req, res) => {
  const criteria = { _id: ObjectID(req.params.id) };
  const result = findProjection(criteria);
  result.then((item) => {
    res.send(item);
  });
});

router.post('/', (req, res) => {
    const result = insertProjection(req.body);
    res.send({
      status: 'success'
    });
});

router.put('/',(req, res) => {
  const result = updateProjection(req.body);
  res.send({
    status: 'success'
  });
});

router.delete('/',(req, res) => {
  const result = deleteProjection(req.body);
  res.send({
    status: 'success'
  });
});

export default router;
