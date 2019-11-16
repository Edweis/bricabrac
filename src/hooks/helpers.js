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
