import { Router } from 'express';
import { insertUsers, updateUsers, deleteUsers, findUsers } from '../db/Users';

const router = Router();

router.get('/', (req, res) => {
    const result = findUsers(req.body);
    result.then((item) => {
      res.send(item);
    })
});

router.post('/', (req, res) => {
    const result = insertUsers(req.body);
    res.send({
      status: 'success'
    });
});

router.put('/',(req, res) => {
  const result = updateUsers(req.body);
  res.send({
    status: 'success'
  });
});

router.delete('/',(req, res) => {
  const result = deleteUsers(req.body);
  res.send({
    status: 'success'
  });
});

export default router;
