import { createContext, useContext } from 'react';
import { ConceptT } from '../../constants/types';

export const BrickContext = createContext([]);

export const useBrickContext = (concept: ConceptT = null) => {
  const bricks = useContext(BrickContext);

  if (concept != null)
    return bricks.filter(brick => brick.parentConcept === concept);
  return bricks;
};
