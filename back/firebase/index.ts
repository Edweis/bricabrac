import admin from 'firebase-admin';
import serviceAccount from '../../keys/dev-firestore.json';

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
const database = admin.firestore();

module.exports = { database, firebase: admin };
