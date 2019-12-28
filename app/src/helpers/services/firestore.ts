import * as rxjs from 'rxjs';
import { Observable } from '../observable';
import { CollectionE } from '../../constants/types';
import firebase, { IS_DEV } from '../../firebase';

let firestoreCountRead = 0;
const displayFirestoreBill = (collection: string, count: number) => {
  firestoreCountRead += count;
  console.debug(
    `Firestore read : ${count} at ${collection}. Total : ${firestoreCountRead}`,
  );
};

export const subscribeFirestore = <T>(collection: CollectionE | string) =>
  new rxjs.Observable<T>(subscriber => {
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

export default class FirestoreService<T> {
  readonly value: Observable<T[]>;

  readonly collection: CollectionE;

  subscription: rxjs.Subscription | null = null;

  constructor(collection: CollectionE) {
    this.value = new Observable<T[]>([], null, collection);
    this.collection = collection;
  }

  sync() {
    const firestoreObs = subscribeFirestore<T[]>(this.collection);
    const subscription = firestoreObs.subscribe(docs => this.value.set(docs));
    this.subscription = subscription;
    return subscription;
  }
}
