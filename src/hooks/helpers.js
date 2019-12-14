// $Flow
import _ from 'lodash';
import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import firebase from '../firebase';

let firestoreCountRead = 0;
const displayFirestoreBill = (collection, count) => {
  firestoreCountRead += count;
  console.debug(
    `Firestore read : ${count} at ${collection}. Total : ${firestoreCountRead}`,
  );
};

export const usePrevious = value => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
};

export const useSubscribedState = defaultState => {
  const [state, setState] = useState(defaultState);
  const prev = usePrevious(defaultState);
  useEffect(() => {
    if (!_.isEqual(defaultState, prev)) setState(defaultState);
  }, [defaultState, prev]);
  return [state, setState];
};

export const useFocusOnMount = dep => {
  const ref = useRef(null);
  useLayoutEffect(() => {
    if (ref.current) ref.current.focus();
  }, [ref.current, dep]);
  return ref;
};

/* Use firestore snapshots to use realtime database */
export const useFirestore = (
  collection: string,
  omitFields: string[] | string = [],
) => {
  const [documents, setDocuments] = useState([]);
  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection(collection)
      .limit(20)
      .onSnapshot(snapshot => {
        const newDocuments = snapshot.docs.map(document => ({
          ...document.data(),
          id: document.id,
        }));
        displayFirestoreBill(collection, newDocuments.length);
        if (!_.isEqual(newDocuments, _.omit(documents, omitFields)))
          setDocuments(newDocuments);
      });
    return () => unsubscribe();
  }, []);
  return documents;
};

/* Use to set data to firestore */

export async function setFirestore<T>(
  collection: string,
  _data: T,
  effects?: T => void = () => {},
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
