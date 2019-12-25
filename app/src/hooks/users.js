import { setFirestore } from './firestore';
import { UserT, CollectionE } from '../constants/types';
import { useObservable } from '../helpers/observable';
import { usersService } from '../helpers/store';

const EMPTY_USER: UserT = { email: "(pas d'autheur)" };

// export const UserContext = createContext([]);
// export const useUserContext = () => useContext(UserContext);
// export const useUsers = () => useFirestore(USER_COLLECTION);

export function useUser(id: string): UserT {
  const users = useObservable(usersService.value);
  const match = users.find(user => user.id === id);
  return match == null ? EMPTY_USER : match;
}

export const setUser = (user: UserT) => {
  const { uid, email } = user;
  const lightUser = { email };

  setFirestore(CollectionE.USERS, lightUser);
};
