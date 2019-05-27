var multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/users');
  },
  filename: function (req, file, cb) {
    let s = file.originalname.split('.');
    cb(null, req.body.userEmail + '-' + Date.now() + '.' + s[s.length - 1]);
  }
});

var upload = multer({ storage: storage });

import { Router } from 'express';
import { insertUsers, updateUsers, deleteUsers, findUsers, getUserBoDashboard, resetPassword, findStrictUsers } from '../db/users';
import { sendWelcomeEmail } from '../db/mailer';
import { getUserDashboard } from '../db/reservations';

const router = Router();

router.get('/', (req, res) => {
    const result = findUsers(req.query);
    result.then((item) => {
      res.send(item);
    }).catch((err) => {
      res.send({
        status: 'error',
        message: err
      })
    });
});

router.post('/', upload.single('userProfilePic'), (req, res) => {
  const user = {
    userName: req.body.userName,
    userFirstName: req.body.userFirstName,
    userDob: req.body.userDob,
    userEmail: req.body.userEmail,
    userPassword: req.body.userPassword,
    userProfilPic: req.file ? req.file.filename : 'default.png',
    userType: 0,
    userApiKey: ''
  }
  const result = insertUsers(user);
  result.then(() => {
    sendWelcomeEmail(user.userName + ' ' + user.userFirstName, user.userEmail);
    res.send({
      status: 'success',
      data: user
    });
  }).catch((err) => {
    res.send({
      status: 'error',
      message: err
    });
  });
});

router.post('/login', (req, res) => {
    let criteria = {
      userEmail: req.body.userEmail,
      userPassword: req.body.userPassword
    }
    const result = findStrictUsers(criteria);
    result.then((item) => {
      res.send(item);
    }).catch((err) => {
      res.send({
        status: 'error',
        message: err
      });
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

router.get('/getUserBoDashboard', (req, res) => {
    const result = getUserBoDashboard(req.query);
    result.then((item) => {
      res.send(item);
    }).catch((err) => {
      res.send({
        status: 'error',
        message: err
      });
    });
});

router.get('/getUserDashboard', (req, res) => {
    const result = getUserDashboard(req.query.userId);
    result.then((item) => {
      res.send(item);
    }).catch((err) => {
      res.send({
        status: 'error',
        message: err
      });
    });
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
