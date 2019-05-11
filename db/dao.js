const url = 'mongodb://localhost:27017/';
const dbName = 'gotomovie';

var mongoose = require('mongoose');

export const insert = (model) => {
  mongoose.connect(url + dbName, (err) => {
    if(err) throw err;
    model.save((err) => {
      if(err) {
        throw err;
      }
      mongoose.connection.close();
    });
  });
}

export const update = (model) => {
  mongoose.connect(url + dbName, (err) => {
    if(err) throw err;
    model.update((err) => {
      if(err) {
        throw err;
      }
      mongoose.connection.close();
    });
  });
}

export const find = function(model, data, pops, page = 1, total = 15) {
  return mongoose.connect(url + dbName).then((r) => {
    let find = model.find(data);
    for(let i = 0; i < pops.length; i++) {
      find = find.populate(pops[i]);
    }
    return find.exec()
      .then((data) => {
        mongoose.connection.close();
        return data;
      }).catch((err) => {
        throw err;
      });
  }).catch((err) => {
    throw err;
  });
}

export const remove = (model) => {
  mongoose.connect(url + dbName, (err) => {
    if(err) throw err;
    model.remove((err) => {
      if(err) {
        throw err;
      }
      mongoose.connection.close();
    });
  });
}
