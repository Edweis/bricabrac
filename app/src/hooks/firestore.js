import { useState, useEffect } from 'react';
import _ from 'lodash';
import { Observable as ObservableRx } from 'rxjs';
import firebase, { IS_DEV } from '../firebase';

let firestoreCountRead = 0;
const displayFirestoreBill = (collection, count) => {
  firestoreCountRead += count;
  console.debug(
    `Firestore read : ${count} at ${collection}. Total : ${firestoreCountRead}`,
  );
};

/* Use to set data to firestore */

export async function setFirestore<T>(
  collection: string,
  _data: T,
  effects?: (cb: T) => void = () => {},
) {
  const data = _.cloneDeep(_data);

  // Get the id of the data and remove it
  const id = data.id || null;
  delete data.id;

  const col = firebase.firestore().collection(collection);
  // if there is an Id, we edit the brick, otherwise we add it. Dirty.
  if (id == null) {
    const results = await col.add(data);
    effects(results);
  } else {
    await col.doc(id).set(data);
    effects({ ...data, id });
  }
  console.log(
    id != null
      ? `${collection} Edited at id ${id}!`
      : `${collection} added at id ${id}!`,
  );
  console.log({ data });
}

export async function deleteFirestore(collection, id) {
  await firebase
    .firestore()
    .collection(collection)
    .doc(id)
    .delete();
  console.log(`Removed in ${collection} ${id}`);
}
