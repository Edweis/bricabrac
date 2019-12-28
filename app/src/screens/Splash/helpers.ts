import { useEffect, useMemo } from 'react';
import { firestoreSyncAllWithState, loadingService } from '../../helpers/store';

import { useObservable } from '../../helpers/observable';

/* Run sync function from all firestore services and return true once done. */
export const useFirestoreLoading = () => {
  const loadings = useObservable(loadingService.loadings);
  const isStateLoading = useMemo(() => loadingService.isLoading(), [loadings]);

  useEffect(() => {
    const unsubscribe = firestoreSyncAllWithState();
    return () => {
      unsubscribe();
    };
  }, []);
  return isStateLoading;
};
