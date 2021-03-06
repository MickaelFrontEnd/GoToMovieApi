var mongoose = require('mongoose');
import { MovieSchema } from './movies';
import { RoomSchema } from './rooms';

import { insert, update, remove, find, findOne, findWithJuncture, findAll } from './dao';

const document = 'projections';

export const ProjectionSchema = new mongoose.Schema({
  projectionMovie: MovieSchema,
  projectionRoom: RoomSchema,
  projectionDay: Date,
  projectionBegin: String,
  projectionEnd: String,
  projectionFreeSeats: [{
    type: String
  }]
});

export const ProjectionModel = new mongoose.model(document, ProjectionSchema);

export const insertProjection = (collection) => {
  let projectionThisDay = findAll(ProjectionModel, { projectionDay: new Date(collection.projectionDay) }, '');
  return projectionThisDay.then((data) => {
    for(let i = 0; i < data.length; i++) {
      if(isOnThis(data[i].projectionBegin, data[i].projectionEnd, collection.projectionBegin, collection.projectionEnd)){
        throw 'Cette sale est déjà pris pour la date et l\'heure indiqué';
      }
    }
    let model = new ProjectionModel(collection);
    insert(model);
  })
}

export const updateProjection = (collection) => {
  let model = new ProjectionModel(collection);
  update(model);
}

export const findProjection = (collection,page,total) => {

  if(collection.projectionDay && collection.projectionDay !== '') {
    collection.projectionDay = new Date(collection.projectionDay);
  }

  let c = {
    'projectionMovie.movieTitle': collection.movieTitle,
    'projectionMovie.movieLanguage': collection.movieLanguage,
    'projectionMovie.movieType': collection.movieType,
    'projectionRoom.roomName': collection.projectionRoom,
    'projectionDay': collection.projectionDay
  };

  if (!collection.movieTitle) delete c['projectionMovie.movieTitle'];
  if (!collection.movieLanguage) delete c['projectionMovie.movieLanguage'];
  if (!collection.movieType) delete c['projectionMovie.movieType'];
  if (!collection.projectionDay) delete c['projectionDay'];
  if (!collection.projectionRoom) delete c['projectionRoom.roomName'];

  return find(ProjectionModel,c,'',page,total);
}

export const findProjectionById = (id) => {
  let collection = {_id: id};
  return findOne(ProjectionModel,collection,'');
}

export const deleteProjection = (collection) => {
  let model = new ProjectionModel(collection);
  remove(model);
}

function isBefore(time1, time2) {
  if(!time1 || !time2) {
    return true;
  }
  const time1Hour = parseInt(time1.split(':')[0]);
  const time2Hour = parseInt(time2.split(':')[0]);
  if(time1Hour < time2Hour) {
    return true;
  }
  else if(time1Hour === time2Hour) {
    const time1Minute = parseInt(time1.split(':')[1]);
    const time2Minute = parseInt(time2.split(':')[1]);
    return time1Minute < time2Minute;
  }
  else {
    return false;
  }
}

function isOnThis(timeC1, timeC2, time1, time2) {
  return !(isBefore(timeC1, time1) && isBefore(timeC2, time1)) && !(isBefore(time2, timeC1) && isBefore(time2, timeC2));
}
