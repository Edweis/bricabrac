import { setFirestore } from './firestore';
import { UserT, CollectionE } from '../constants/types';
import { useObservable } from '../helpers/observable';
import { usersService } from '../helpers/store';

export function useUserEmail(id: string): string | null {
  const users = useObservable(usersService.value);
  const match = users.find(user => user.id === id);
  if (match == null) return null;
  return match.email;
}

export const setUser = (user: UserT) => {
  const lightUser = { email: user.email };
  setFirestore(CollectionE.USERS, lightUser);
};
