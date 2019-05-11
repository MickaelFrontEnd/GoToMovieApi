var mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;

import { insert, update, remove, find, findWithJuncture } from './dao';

const document = 'projections';
const ref = 'movies';

export const ProjectionSchema = new mongoose.Schema({
  projectionMovie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: ref
  },
  projectionRoom: String,
  projectionDay: Date,
  projectionBegin: String,
  projectionEnd: String,
});

export const ProjectionModel = new mongoose.model(document, ProjectionSchema);

export const insertProjection = (collection) => {
  collection.projectionMovie = ObjectId(collection.projectionMovie);
  let model = new ProjectionModel(collection);
  insert(model);
}

export const updateProjection = (collection) => {
  let model = new ProjectionModel(collection);
  update(model);
}

export const findProjection = (collection,page,total) => {
  return find(ProjectionModel,collection,['projectionMovie'],page,total);
}

export const deleteProjection = (collection) => {
  let model = new ProjectionModel(collection);
  remove(model);
}
