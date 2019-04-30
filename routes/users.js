var MongoClient = require('mongodb').MongoClient;

import { Router } from 'express';

const router = Router();

const url = 'mongodb://localhost:27017';
const dbName = 'gotomovie';
const client = new MongoClient(url)

router.get('/', (req, res) => {  
    client.connect(function (err, client) {
        if(err) {
            res.send('Db Connexion failed');
        }
        const db = client.db(dbName);
        db.collection('users').find({}).toArray(function(error,documents){
            if(error) {
                res.send('An error has been detected');
            }
            res.send(documents);
        });
        client.close();
    });
});

export default router;