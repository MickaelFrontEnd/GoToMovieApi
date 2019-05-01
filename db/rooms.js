import { insert, update, remove, find } from './dao';

const document = 'rooms';

export const insertRooms = (collection) => {
  // Verification
  insert(document,collection);
}

export const updateRooms = (collection) => {
  update(document,collection);
}

export const findRooms = (collection,page,total) => {
  return find(document,collection,page,total);
}

export const deleteRooms = (collection) => {
  remove(document,collection);
}
