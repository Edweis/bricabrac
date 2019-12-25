import { createContext, useContext } from 'react';
import { useFirestore, setFirestore } from './firestore'
import { UserT } from '../constants/types';

const USER_COLLECTION = 'users';
const EMPTY_USER = { email: "(pas d'autheur)" };

export const UserContext = createContext([]);
export const useUserContext = () => useContext(UserContext);
export const useUsers = () => useFirestore(USER_COLLECTION);

export function useUser(id: string): UserT {
  const users = useUserContext();
  const match = users.find(user => user.id === id);
  return match == null ? EMPTY_USER : match;
}

export const setUser = (user: UserT) => {
  const { uid, email } = user;
  const lightUser = { email };

  setFirestore(USER_COLLECTION, lightUser);
};
