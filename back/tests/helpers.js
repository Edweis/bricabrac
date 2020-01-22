const fs = require('fs');
const path = require('path');

const getFirestoreRules = () => {
  const jsonPath = path.join(__dirname, '..', 'firebase', 'firestore.rules');
  return fs.readFileSync(jsonPath, 'utf8');
};

module.exports = {
  getFirestoreRules,
};
