import { Router } from 'express';
import { insertRooms, updateRooms, deleteRooms, findRooms } from '../db/rooms';

const router = Router();

router.get('/', (req, res) => {
    const result = findRooms(req.query);
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
  const result = insertRooms(req.body);
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
  const result = updateRooms(req.body);
  res.send({
    status: 'success'
  });
});

router.delete('/',(req, res) => {
  const result = deleteRooms(req.body);
  res.send({
    status: 'success'
  });
});

export default router;
