var mongoose = require('mongoose');

import { insert, update, remove, find, count, url, dbName } from './dao';
import { MovieModel } from './movies';
import { ProjectionModel } from './projections';
import { RoomModel } from './rooms';

const document = 'users';

export const UserSchema = new mongoose.Schema({
  userName: String,
  userFirstName: String,
  userDob: String,
  userEmail: String,
  userPassword: String,
  userProfilPic: String,
  userType: Number,
  userApiKey: String
});

export const UserModel = new mongoose.model(document, UserSchema);

function hash(text) {
  var hash = 0;
  if (text.length == 0) return hash;
  for (let i = 0; i < text.length; i++) {
      let char = text.charCodeAt(i);
      hash = ((hash<<5)-hash) + char;
      hash = hash & hash;
  }
  return hash;
}

export const insertUsers = (collection) => {
  // Api key
  collection['userApiKey'] = hash(collection.userEmail);
  let model = new UserModel(collection);
  // Verification
  insert(model);
}

export const updateUsers = (collection) => {
  let model = new UserModel(collection);
  update(model);
}

export const findUsers = (collection,page,total) => {
  return find(UserModel,collection,'',page,total);
}

export const deleteUsers = (collection) => {
  let model = new MovieModel(collection);
  remove(model);
}

export const getUserBoDashboard = async () => {
  await mongoose.connect(url + dbName);
  let movie = await count(MovieModel);
  let projections = await count(ProjectionModel);
  let room = await count(RoomModel);
  let user = await count(UserModel);
  mongoose.connection.close();
  return {
    movieNumber: movie,
    projectionNumber: projections,
    roomNumber: room,
    userNumber: user
  }
}
