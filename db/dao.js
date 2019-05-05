var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

const url = 'mongodb://localhost:27017';
const dbName = 'gotomovie';

export const insert = (name,collections) => {
  const client = new MongoClient(url);
  client.connect((err) => {
    const db = client.db(dbName);
    const collection = db.collection(name);
    delete collections._id;
    collection.insertOne(collections,(err,result) => {
      client.close();
    });
  });
}

export const update = (name,collections) => {
  const client = new MongoClient(url);
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

export const find = function(name,collections,page = 1,total = 15) {
  const client = new MongoClient(url);
  return client.connect().then((err) => {
    const db = client.db(dbName);
    const collection = db.collection(name);
    return collection.find(collections)
      .skip((page - 1) * total)
      .limit(total)
      .toArray()
      .then((items) => {
        return items;
      });
  });
}

export const remove = (name,collections) => {
  const client = new MongoClient(url);
  client.connect((err) => {
    const db = client.db(dbName);
    const collection = db.collection(name);
    const id = ObjectID(collections._id);
    collection.deleteOne({_id: id},(err,result) => {
      client.close();
      console.log('connection closed');
    });
  });
}
