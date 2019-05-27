var mongoose = require('mongoose');

import { insert, update, remove, find, count, url, dbName, findOne, findStrict } from './dao';
import { MovieModel } from './movies';
import { ProjectionModel } from './projections';
import { RoomModel } from './rooms';
import { sendForgotPassword, sendAdminPassword } from './mailer';

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

function hashPassword(plainText) {
  return 'newPassword';
}

function generatePassword(user) {
  return 'Maodiapasy123!';
}

export const insertUsers = (collection) => {
  let find = findOne(UserModel, { userEmail: collection.userEmail },'');
  return find.then((user) => {
    if(!user) {
      // Api key
      collection['userApiKey'] = hash(collection.userEmail);
      let model = new UserModel(collection);
      // Verification
      insert(model);
    }
    else {
      throw 'Cet identifiant est déjà utilisé! Veuillez utiliser un autre identifiant';
    }
  })
}

export const updateUsers = (condition, collection) => {
  update(UserModel, condition, collection);
}

export const findUsers = (collection) => {
  if(collection.userType) {
    collection.userType = parseInt(collection.userType);
  }
  return find(UserModel,collection,'');
}

export const findStrictUsers = (collection) => {
  return findStrict(UserModel, collection, '');
}


export const resetPassword = (collection) => {
  let find = findOne(UserModel, { userEmail: collection.userEmail },'');
  return find.then((user) => {
    if(user) {
      const password = generatePassword();
      updateUsers({ userEmail: collection.userEmail }, { userPassword: password });
      sendForgotPassword(collection.userEmail, password);
    }
    else {
      throw('Cet identifiant ne figure pas dans notre base de donnée');
    }
  });

}

export const sendPassword = (collection) => {
  sendAdminPassword(collection.userEmail);
}

export const getUserBoDashboard = async () => {
  await mongoose.connect(url + dbName);
  let movie = await count(MovieModel, {});
  let projections = await count(ProjectionModel, {});
  let room = await count(RoomModel, {});
  let user = await count(UserModel, {});
  mongoose.connection.close();
  return {
    movieNumber: movie,
    projectionNumber: projections,
    roomNumber: room,
    userNumber: user
  };
}
