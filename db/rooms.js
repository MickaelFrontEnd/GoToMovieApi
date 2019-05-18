var mongoose = require('mongoose');

import { insert, update, remove, find, findOneStrict } from './dao';

const document = 'rooms';

export const RoomSchema = new mongoose.Schema({
  roomName: String,
  roomSeats:[{
    type: String
  }]
});

export const RoomModel = new mongoose.model(document, RoomSchema);

export const insertRooms = async (collection) => {
  // Verifier si la salle existe déjà
  let room = await findOneStrict(RoomModel, { roomName: collection.roomName }, '');
  if(!room) {
    let model = new RoomModel(collection);
    insert(model);
  }
  else {
    throw 'Cette salle existe déjà';
  }
}

export const updateRooms = (collection) => {
  let model = new RoomModel(collection);
  update(model);
}

export const findRooms = (collection,page,total) => {
  return find(RoomModel,collection,'',page,total);
}

export const deleteRooms = (collection) => {
  let model = new RoomModel(collection);
  remove(model);
}
