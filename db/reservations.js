var mongoose = require('mongoose');

import { ProjectionSchema, ProjectionModel } from './projections';
import { UserSchema }  from './users';

import { insert, updateAndLeaveOpen, find, url, dbName, count } from './dao';

const document = 'reservations';

export const ReservationSchema = new mongoose.Schema({
  reservationUser: UserSchema,
  reservationProjection: ProjectionSchema,
  reservationSeats: [{
    type: String
  }]
});

export const ReservationModel = new mongoose.model(document, ReservationSchema);

export const addReservation = async (collection) => {
  // Find projections
  return updateAndLeaveOpen(ProjectionModel, { _id: collection.reservationProjection._id }, collection.reservationProjection).then(
    (projection) => {
      return insert(new ReservationModel(collection));
    },
    (err) => {
      throw err;
    }
  );
}

export const findReservations = (collection,page,total) => {
  if(collection.projectionDay && collection.projectionDay !== '') {
    collection.projectionDay = new Date(collection.projectionDay);
  }

  let c = {
    'reservationProjection.projectionMovie.movieTitle': collection.movieTitle,
    'reservationUser.userName': collection.userName,
    'reservationUser.userFirstName': collection.userFirstName,
    'reservationProjection.projectionRoom.roomName': collection.projectionRoom,
    'reservationProjection.projectionDay': collection.projectionDay,
    'reservationUser._id': collection.userId
  };

  if (!collection.movieTitle) delete c['reservationProjection.projectionMovie.movieTitle'];
  if (!collection.userName) delete c['reservationUser.userName'];
  if (!collection.userFirstName) delete c['reservationUser.userFirstName'];
  if (!collection.projectionDay) delete c['reservationProjection.projectionDay'];
  if (!collection.projectionRoom) delete c['reservationProjection.projectionRoom.roomName'];
  if (!collection.userId) delete c['reservationUser._id'];

  return find(ReservationModel,c,'',page,total);
}


export const getUserDashboard = async (userId) => {
  await mongoose.connect(url + dbName);
  let projections = await count(ProjectionModel, {});
  let reservations = await count(ReservationModel, {'reservationUser._id': userId });
  mongoose.connection.close();
  return {
    projectionNumber: projections,
    reservationNumber: reservations
  };
}
