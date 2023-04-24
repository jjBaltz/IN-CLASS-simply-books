import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

// GET ALL AUTHORS
const getAuthors = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/authors.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

// CREATE AUTHOR
const createAuthor = (authObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/authors.json`, authObj)
    .then((response) => {
      const payload = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/authors/${response.data.name}.json`, payload)
        .then(resolve);
    }).catch(reject);
});

const getSingleAuthor = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/authors/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch(reject);
});

// DELETE AUTHOR
const deleteSingleAuthor = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/authors/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch(reject);
});

// UPDATE AUTHOR
const updateAuthor = (authorId) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/authors/${authorId.firebaseKey}.json`, authorId)
    .then(() => getAuthors(authorId.uid).then(resolve))
    .catch((error) => reject(error));
});

// GET A SINGLE AUTHOR'S BOOKS
const getAuthorBooks = (authorId) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/books.json?orderBy= "author_id" &equalTo="${authorId}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

export {
  getAuthors,
  createAuthor,
  getSingleAuthor,
  deleteSingleAuthor,
  updateAuthor,
  getAuthorBooks,
};
