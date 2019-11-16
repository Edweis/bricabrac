import { useFirestore } from './helpers';
import { UserT } from '../constants/types';
import firebase from '../firebase';

const USER_COLLECTION = 'users';
const EMPTY_USER = { email: "(pas d'autheur)" };

export const useUsers = () => useFirestore(USER_COLLECTION);

export function useUser(id: string): UserT {
  const users = useUsers();
  const match = users.find(user => user.id === id);
  return match == null ? EMPTY_USER : match;
}

export const setUser = (user: UserT) => {
  const { uid, email } = user;
  const lightUser = { email };
  firebase
    .firestore()
    .collection(USER_COLLECTION)
    .doc(uid)
    .set(lightUser)
    .then(() => {
      console.log('user added !');
      console.log({ lightUser, uid });
    })
    .catch(err => console.error(err));
};
