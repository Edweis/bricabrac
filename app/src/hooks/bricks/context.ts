import { createContext, useContext } from 'react';
import { ConceptT, BrickT } from '../../constants/types';

export const BrickContext = createContext([]);

export const useBrickContext = (concept: ConceptT | null = null) => {
  const bricks = useContext(BrickContext);

  if (concept != null)
    return bricks.filter((brick: BrickT) => brick.parentConcept === concept);
  return bricks;
};
