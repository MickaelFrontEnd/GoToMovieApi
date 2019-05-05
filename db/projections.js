import { insert, update, remove, find } from './dao';

const document = 'projections';

export const insertProjection = (collection) => {
  // Verification
  insert(document,collection);
}

export const updateProjection = (collection) => {
  update(document,collection);
}

export const findProjection = (collection,page,total) => {
  return find(document,collection,page,total);
}

export const deleteProjection = (collection) => {
  remove(document,collection);
}
