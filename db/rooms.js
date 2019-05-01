import { insert, update, remove } from './dao';

const document = 'rooms';

export const insertRooms = (collection) => {
  // Verification
  insert(document,collection);
}

export const updateRooms = (collection) => {
  update(document,collection);
}

export const deleteRooms = (collection) => {
  remove(document,collection);
}
