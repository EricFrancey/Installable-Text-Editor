import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Accept content and add it to database
export const putDb = async (content) => {
  console.log('PUT to the database');

  // Database and version
  const jateDb = await openDB('jate', 1);

  // Data privileges
  const tx = jateDb.transaction('jate', 'readwrite');

  // Open object store'jate'
  const store = tx.objectStore('jate');

  const request = store.put({ jate: content });

  //Confirmation
  const result = await request;
  console.log('PUT data successful', result);
};

// Get all content from database
export const getDb = async () => {
  console.log('GET from the database');

  // Database and version
  const jateDb = await openDB('jate', 1);

  // Data privileges
  const tx = jateDb.transaction('jate', 'readwrite');

  // Open object store'jate'
  const store = tx.objectStore('jate');

  const request = store.getAll();

  // Confirmation
  const result = await request;
  console.log('GET data successful', result);
};


initdb();


