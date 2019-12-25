import _ from 'lodash';
import { Observable as ObservableRx } from 'rxjs';
import firebase, { IS_DEV } from '../firebase';
import { CollectionE } from '../constants/types';

let firestoreCountRead = 0;
const displayFirestoreBill = (collection: string, count: number) => {
  firestoreCountRead += count;
  console.debug(
    `Firestore read : ${count} at ${collection}. Total : ${firestoreCountRead}`,
  );
};

export const subscribeFirestore = <T>(collection: CollectionE | string) =>
  new ObservableRx<T>(subscriber => {
    const unsubscribe = firebase
      .firestore()
      .collection(collection)
      .limit(IS_DEV ? 20 : 10000)
      .onSnapshot(snapshot => {
        const newDocuments = snapshot.docs.map(document => ({
          ...document.data(),
          id: document.id,
        }));
        displayFirestoreBill(collection, newDocuments.length);
        const newDocumentsCasted = (newDocuments as unknown) as T;
        subscriber.next(newDocumentsCasted);
      });

    return unsubscribe;
  });
