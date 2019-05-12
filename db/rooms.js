var mongoose = require('mongoose');

import { insert, update, remove, find } from './dao';

const document = 'rooms';

export const RoomSchema = new mongoose.Schema({
  roomName: String,
  roomSeats: [{
    type: String
  }]
});

export const RoomModel = new mongoose.model(document, RoomSchema);

export const insertRooms = (collection) => {
  // Verification
  let model = new RoomModel(collection);
  insert(model);
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
