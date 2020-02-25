import { useMemo } from 'react';
import { setFirestore } from './firestore';
import { UserT, CollectionE } from '../constants/types';
import { useObservable } from '../helpers/observable';
import { usersService } from '../helpers/store';

type StringMap = { [key: string]: string };
export const useUserEmailMap = (): StringMap => {
  const users = useObservable(usersService.value);
  return useMemo(
    () => users.reduce((a, user) => ({ ...a, [user.id]: user.email }), {}),
    [users],
  );
};
export function useUserEmail(id: string): string | null {
  const users = useObservable(usersService.value);
  return useMemo(() => {
    const match = users.find(user => user.id === id);
    if (match == null) return null;
    return match.email;
  }, [id]);
}

export const setUser = (user: UserT) => {
  const lightUser = { email: user.email };
  setFirestore(CollectionE.USERS, lightUser);
};
