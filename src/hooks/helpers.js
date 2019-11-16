// $Flow
import _ from 'lodash';
import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import firebase from '../firebase';

export const useSubscribedState = defaultState => {
  const [state, setState] = useState(defaultState);
  useEffect(() => {
    setState(defaultState);
  }, [defaultState]);
  return [state, setState];
};

export const useFocusOnMount = () => {
  const ref = useRef(null);
  useLayoutEffect(() => {
    if (ref.current) ref.current.focus();
  }, [ref.current]);
  return ref;
};

export const usePrevious = value => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
};

/* Use firestore snapshots to use realtime database */
export const useFirestore = (
  collection: string,
  omitFields: string[] | string = []
) => {
  const [documents, setDocuements] = useState([]);
  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection(collection)
      .onSnapshot(snapshot => {
        const newDocuments = snapshot.docs.map(document => ({
          ...document.data(),
          id: document.id
        }));
        if (!_.isEqual(newDocuments, _.omit(documents, omitFields))) {
          setDocuements(newDocuments);
        }
      });
    return () => unsubscribe();
  }, []);
  return documents;
};

/* Use to set data to firestore */

export async function setFirestore<T>(
  collection: string,
  _data: T,
  effects?: T => void = () => {}
) {
  console.debug(`ABOUT TO SET ${collection}`);
  const data = _.cloneDeep(_data);

  // Get the id of the data and remove it
  const id = data.id || null;
  delete data.id;

  const col = firebase.firestore().collection(collection);
  // if there is an Id, we edit the brick, otherwise we add it. Dirty.
  if (id == null) {
    const results = await col.add(data);
    console.debug({ results });
    effects(results);
  } else {
    await col.doc(id).set(data);
    effects({ ...data, id });
  }
  console.log(id != null ? `${collection} Edited` : `${collection} added !`);
  console.log({ data });
}
