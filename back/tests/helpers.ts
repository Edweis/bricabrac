import fs from 'fs';
import path from 'path';

export const getFirestoreRules: object = () => {
  const jsonPath = path.join(__dirname, '..', 'firebase', 'firestore.rules');
  return fs.readFileSync(jsonPath, 'utf8');
};
