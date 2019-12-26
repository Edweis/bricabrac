import { setFirestore } from './firestore';
import { UserT, CollectionE } from '../constants/types';
import { useObservable } from '../helpers/observable';
import { usersService } from '../helpers/store';

export function useUser(id: string): UserT {
  const users = useObservable(usersService.value);
  const match = users.find(user => user.id === id);
  if (match == null) throw Error(`User not found : ${id}`);
  return match;
}

export const setUser = (user: UserT) => {
  const lightUser = { email: user.email };
  setFirestore(CollectionE.USERS, lightUser);
};
