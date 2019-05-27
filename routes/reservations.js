import { Router } from 'express';
import { addReservation, findReservations } from '../db/reservations';

const router = Router();

router.get('/', (req, res) => {
  const result = findReservations(req.query);
  result.then((item) => {
    res.send(item);
  })
  .catch((err) => {
    res.send(err);
  });
});

router.post('/', (req, res) => {
  addReservation(req.body).then(
    (reservation) => {
      res.send({
        status: 'success'
      });
    },
    (err) => {
      res.send({
        status: 'error',
        message: err
      });
    }
  );
});


export default router;
