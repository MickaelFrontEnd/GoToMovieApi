import { insert, update, remove, find } from './dao';

const document = 'movies';

export const insertMovies = (collection) => {
  // Verification
  insert(document,collection);
}

export const updateMovies = (collection) => {
  update(document,collection);
}

export const findMovies = (collection,page,total) => {
  return find(document,collection,page,total);
}

export const deleteMovies = (collection) => {
  remove(document,collection);
}
