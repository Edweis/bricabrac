import { useEffect } from 'react';
import { firestoreSyncAllWithState } from '../../helpers/store';

const LoadStoreOnMount = ({
  children,
}: {
  children: JSX.Element[] | JSX.Element;
}) => {
  useEffect(() => {
    const unsubscribe = firestoreSyncAllWithState();
    return () => {
      unsubscribe();
    };
  }, []);
  return children;
};
export default LoadStoreOnMount;
