import { Router } from 'express';
import { insertUsers, updateUsers, deleteUsers, findUsers, getUserBoDashboard, resetPassword } from '../db/Users';

const router = Router();

router.get('/', (req, res) => {
    const result = findUsers(req.query);
    result.then((item) => {
      res.send(item);
    })
});

router.post('/', (req, res) => {
    try {
      const result = insertUsers(req.body);
      res.send({
        status: 'success'
      });
    }
    catch(e) {
      res.send({
        status: 'error',
        message: e
      });
    }
});

router.post('/login', (req, res) => {
    let criteria = {
      userEmail: req.body.userEmail,
      userPassword: req.body.userPassword
    }
    const result = findUsers(criteria);
    result.then((item) => { console.log(item);
      res.send(item);
    })
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

router.get('/getUserBoDashboard', (req, res) => {
    const result = getUserBoDashboard(req.query);
    result.then((item) => {
      res.send(item);
    })
});

router.post('/resetPassword', (req, res) => {
  resetPassword(req.body).then(() => {
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

export default router;
