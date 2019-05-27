import { Router } from 'express';
import { insertProjection, updateProjection, deleteProjection, findProjection, findProjectionById } from '../db/projections';
var ObjectID = require('mongodb').ObjectID;

const router = Router();

router.get('/', (req, res) => {
    const result = findProjection(req.query);
    result.then((item) => {
      res.send(item);
    }).catch((err) => {
      res.send({
        status: 'error',
        message: err
      });
    });
});

router.get('/:id', (req, res) => {
  const criteria = { _id: ObjectID(req.params.id) };
  const result = findProjectionById(criteria);
  result.then((item) => {
    res.send(item);
  }).catch((err) => {
    res.send({
      status: 'error',
      message: err
    });
  });
});

router.post('/', (req, res) => {
    const result = insertProjection(req.body);
    result.then(() => {
      res.send({
        status: 'success'
      });
    }).catch((err) => {
      res.send({
        status: 'error',
        message: err
      });
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
