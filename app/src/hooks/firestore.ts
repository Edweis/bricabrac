import _ from 'lodash';
import firebase from '../firebase';
import { CollectionE } from '../constants/types';

/* Use to set data to firestore */
// type DocumentReference = firebase.firestore.DocumentReference;
type FirestoreObject = Record<string, any> & { id?: string };
export async function setFirestore<T extends FirestoreObject>(
  collection: string,
  _data: T,
) {
  const data = _.omit(_data, 'id');

  // Get the id of the data and remove it
  const id = _data.id || null;

  const col = firebase.firestore().collection(collection);
  // if there is an Id, we edit the brick, otherwise we add it. Dirty.
  if (id == null) await col.add(data);
  else await col.doc(id).set(data);

  console.log(
    id != null
      ? `${collection} Edited at id ${id}!`
      : `${collection} added at id ${id}!`,
  );
  console.log({ data });
}

export async function deleteFirestore(collection: CollectionE, id: string) {
  await firebase
    .firestore()
    .collection(collection)
    .doc(id)
    .delete();
  console.log(`Removed in ${collection} ${id}`);
}
