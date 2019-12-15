const ora = require('ora')
const admin = require('firebase-admin');
const prompts = require('prompts');
const prodServiceAccount = require('../../keys/prod-firestore');
const devServiceAccount = require('../../keys/dev-firestore');

const prodFirestore = admin.initializeApp({
  credential: admin.credential.cert(prodServiceAccount)
}, 'prod');

const devFirestore = admin.initializeApp({
  credential: admin.credential.cert(devServiceAccount)
}, 'dev');
const db = {
  prod: prodFirestore.firestore(),
  dev: devFirestore.firestore(),
};



async function confirmPrompt(){
  const response = await prompts({
      type: 'toggle',
      name: 'value',
      message: 'Wanna proceed?',
      initial: false,
      active: 'yes',
      inactive: 'no'
    });

  if(!response.value) process.exit(1)
};



async function getCollections(env){
  const spinner = ora().start()
  const collections = await db[env].listCollections()

  const results = await Promise.all(collections
    .map(async c => {
      const snapshot = await db[env].collection(c.id).get();
      return ({name:c.id, count:snapshot.size})
    }))

  spinner.stop()
  return results;
}



async function dumpDevDatabase(){
  console.log('Dumping dev...')
  const collections = await db.dev.listCollections()
  collections.map(async c => {
    const snapshot = await db.dev.collection(c.id).get()
    let batch = db.dev.batch();
    snapshot.forEach( doc => batch.delete(doc.ref))
    await batch.commit()
  })
}



module.exports = async (args) => {
  // const spinner = ora().start()
  try {
    const collections = {
      prod: await getCollections('prod'),
      dev: await getCollections('dev'),
    };

    console.log('About to delete these collections in DEV database :')
    console.log(collections.dev)
    console.log('And replace them with :')
    console.log(collections.prod)
    await confirmPrompt()

    await dumpDevDatabase();
    // await copyProdToDev()




  } catch(err){
    console.error('ERROR', err)
  }
  console.log('done.')
}
