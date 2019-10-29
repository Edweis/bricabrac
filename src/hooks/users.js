import { useState, useEffect } from 'react';
import _ from 'lodash';
import { UserT } from '../constants/types';
import firebase from '../firebase';

const USER_COLLECTION = 'users';
const EMPTY_USER = { email: "(pas d'autheur)" };

export const useUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection(USER_COLLECTION)
      .onSnapshot(snapshot => {
        const newUsers = snapshot.docs.map(user => ({
          id: user.id,
          ...user.data()
        }));
        if (!_.isEqual(newUsers, users)) setUsers(newUsers);
      });
    return () => unsubscribe();
  }, []);
  return users;
};

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
