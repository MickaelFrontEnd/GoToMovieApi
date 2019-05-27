export const url = 'mongodb://localhost:27017/';
export const dbName = 'gotomovie';

var mongoose = require('mongoose');

export const insert = (model) => {
  mongoose.connect(url + dbName, (err) => {
    if(err) throw err;
    model.save((err) => {
      mongoose.connection.close();
      if(err) {
        throw err;
      }
    });
  });
}

export const update = (model, condition, update) => {
  return mongoose.connect(url + dbName, (err) => {
    if(err) throw err;
    model.updateOne(condition, update, (err) => {
      mongoose.connection.close();
      if(err) {
        throw err;
      }
    });
  });
}

export const updateAndLeaveOpen = (model, condition, update) => {
  return mongoose.connect(url + dbName, (err) => {
    if(err) throw err;
    model.updateOne(condition, update, (err) => {
      if(err) {
        throw err;
      }
    });
  });
}


const changeData = function(data) {
  for (var property in data) {
    if (data.hasOwnProperty(property)) {
      if(typeof data[property] === 'string' && !property.includes('_id')) {
        data[property] = new RegExp(data[property], 'i');
      }
    }
  }
  return data;
}

export const findOne = function(model, data, pops) {
  return mongoose.connect(url + dbName).then((r) => {
    let fdata = changeData(data);
    let find = model.findOne(fdata);
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

export const findAll = function(model, data, pops) {
  return mongoose.connect(url + dbName).then((r) => {
    let fdata = changeData(data);
    let find = model.find(fdata);
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

export const find = function(model, data, pops, page = 1, total = 100) {
  return mongoose.connect(url + dbName).then((r) => {
    let fdata = changeData(data);
    let find = model.find(fdata);
    for(let i = 0; i < pops.length; i++) {
      find = find.populate(pops[i]);
    }
    find = find.skip((page - 1) * total)
      .limit(total)
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

export const findStrict = function(model, data, pops) {
  let find = model.find(data);
  return mongoose.connect(url + dbName).then((r) => {
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

export const findOneStrict = function(model, data, pops) {
  let find = model.findOne(data);
  return mongoose.connect(url + dbName).then((r) => {
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
      mongoose.connection.close();
      if(err) {
        throw err;
      }
    });
  });
}

export const count = async (model, condition) => {
  let result = await model.count(condition, (err, count) => {
    if(err) {
      throw err;
    }
    return count;
  });
  return result;
}
