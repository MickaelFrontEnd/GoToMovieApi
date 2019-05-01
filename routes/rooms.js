import { Router } from 'express';
import { insertRooms, updateRooms, deleteRooms } from '../db/rooms';

const router = Router();

router.post('/', (req, res) => {
    const result = insertRooms({
      nom: 'Salle A'
    })
    res.send({
      status: 'success'
    });
});

router.put('/',(req, res) => {
  const result = updateRooms({
    _id: '5cc9ab1768e3e75698d65551',
    nom: 'Salle B'
  });
  res.send({
    status: 'success'
  });
});

router.delete('/',(req, res) => {
  const result = deleteRooms({
    _id: '5cc9ab1768e3e75698d65551',
    nom: 'Salle B'
  });
  res.send({
    status: 'success'
  });
});



export default router;
