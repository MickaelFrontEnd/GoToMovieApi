var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

const url = 'mongodb://localhost:27017';
const dbName = 'gotomovie';
const client = new MongoClient(url);

export const insert = (name,collections) => {
  client.connect((err) => {
    const db = client.db(dbName);
    const collection = db.collection(name);
    collection.insertOne(collections,(err,result) => {
      client.close();
    });
  });
}

export const update = (name,collections) => {
  client.connect((err) => {
    const db = client.db(dbName);
    const collection = db.collection(name);
    const id = ObjectID(collections._id);
    delete collections._id;
    collection.updateOne({_id: id},{$set:collections},(err,result) => {
      client.close();
    });
  });
}

export const remove = (name,collections) => {
  client.connect((err) => {
    const db = client.db(dbName);
    const collection = db.collection(name);
    const id = ObjectID(collections._id);
    collection.deleteOne({_id: id},(err,result) => {
      client.close();
    });
  });
}
