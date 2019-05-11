var mongoose = require('mongoose');

import { insert, update, remove, find } from './dao';

const document = 'movies';

export const MovieSchema = new mongoose.Schema({
  movieTitle: String,
  movieDescription: String,
  movieLanguage: String,
  movieType: String,
  movieActor: String,
  movieDirector: String,
  movieTrailer: String,
  moviePic: String
});

export const MovieModel = new mongoose.model(document, MovieSchema);

export const insertMovies = (collection) => {
  // Verification
  let model = new MovieModel(collection);
  insert(model);
}

export const updateMovies = (collection) => {
  let model = new MovieModel(collection);
  update(model);
}

export const findMovies = (collection,page,total) => {
  return find(MovieModel,collection,'',page,total);
}

export const deleteMovies = (collection) => {
  let model = new MovieModel(collection);
  remove(model);
}
