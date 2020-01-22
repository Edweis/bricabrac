const ora = require('ora');
const admin = require('firebase-admin');
const _ = require('lodash');
const prompts = require('prompts');
const prodServiceAccount = require('../../../keys/prod-firestore');
const devServiceAccount = require('../../../keys/dev-firestore');

if (devServiceAccount.project_id !== 'bricabrac-dev') {
  console.error('devServiceAccount is NOT bricabrac-dev');
  process.exit(1);
}
if (prodServiceAccount.project_id !== 'bric-a-brac-fb') {
  console.error('prodServiceAccount is NOT bricabrac');
  process.exit(1);
}

const prodFirestore = admin.initializeApp(
  {
    credential: admin.credential.cert(prodServiceAccount),
  },
  'prod',
);

const devFirestore = admin.initializeApp(
  {
    credential: admin.credential.cert(devServiceAccount),
  },
  'dev',
);
const db = {
  prod: prodFirestore.firestore(),
  dev: devFirestore.firestore(),
};

// We can't know if there are sub collections
// https://stackoverflow.com/questions/48440382/how-to-list-subcollection-on-firestore
// We reference them here
// const subCollection = { bricks:  "comments"  }

async function confirmPrompt() {
  const response = await prompts({
    type: 'toggle',
    name: 'value',
    message: 'Wanna proceed?',
    initial: false,
    active: 'yes',
    inactive: 'no',
  });

  if (!response.value) process.exit(1);
}

async function getCollections(env) {
  const spinner = ora().start();
  const collections = await db[env].listCollections();

  const results = await Promise.all(
    collections.map(async c => {
      const snapshot = await db[env].collection(c.id).get();
      return { name: c.id, count: snapshot.size };
    }),
  );

  spinner.stop();
  return results;
}

async function dumpDevDatabase() {
  console.log('Dumping dev...');
  const collections = await db.dev.listCollections();
  collections.map(async c => {
    const snapshot = await db.dev.collection(c.id).get();
    const batch = db.dev.batch();
    snapshot.forEach(doc => batch.delete(doc.ref));
    await batch.commit();
  });
}

// Use https://blog.cloudboost.io/copy-export-a-cloud-firestore-database-388cde99259b
// for subcollections
async function copyProdToDev() {
  source = db.prod;
  dest = db.dev;

  const collections = await source.listCollections();
  const collectionIds = collections.map(c => c.id);
  const batchs = [];
  await Promise.all(
    collectionIds.map(async cId => {
      const snapshots = await source.collection(cId).get();
      snapshots.forEach(async doc => {
        const data = doc.data();
        batchs.push({
          log: `${cId} > doc :${doc.id}`,
          path: dest.collection(cId).doc(doc.id),
          data,
        });
      });
    }),
  );
  await Promise.all(
    _.chunk(batchs, 500).map(async chunk => {
      const batch = dest.batch();
      chunk.forEach(req => batch.set(req.path, req.data));
      await batch.commit();
    }),
  );
  console.log(`${batchs.length} documents written.`);
}

module.exports = async args => {
  try {
    const collections = {
      prod: await getCollections('prod'),
      dev: await getCollections('dev'),
    };

    console.log('About to delete these collections in DEV database :');
    console.log(collections.dev);
    console.log('And replace them with :');
    console.log(collections.prod);
    await confirmPrompt();
    await dumpDevDatabase();
    await copyProdToDev();
  } catch (err) {
    console.error('ERROR', err);
  }
  console.log('done.');
};
