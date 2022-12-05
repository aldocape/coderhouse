import admin from 'firebase-admin';
const serviceAccount = require('../../firebase.config.json');
// import serviceAccount from '../../firebase.config.json' assert {type: 'json'};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

/// Accedo a la DB de mi app
const db = admin.firestore();

export const UserDB = db.collection('users');
