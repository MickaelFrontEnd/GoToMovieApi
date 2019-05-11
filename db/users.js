import { insert, update, remove, find } from './dao';

const document = 'users';

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
  // Verification
  insert(document,collection);
}

export const updateUsers = (collection) => {
  update(document,collection);
}

export const findUsers = (collection,page,total) => {
  return find(document,collection,page,total);
}

export const deleteUsers = (collection) => {
  remove(document,collection);
}
