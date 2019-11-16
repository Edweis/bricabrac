import _ from 'lodash';
import { createContext, useState, useEffect, useContext } from 'react';
import { BrickT, StatusT, ConceptT } from '../../constants/types';
import { usePrevious } from '../helpers';

export const BrickContext = createContext([]);

export const useBrickContext = (concept: ConceptT = null) => {
  const bricks = useContext(BrickContext);

  if (concept != null)
    return bricks.filter(brick => brick.parentConcept === concept);
  return bricks;
};

/* Return bricks filtered with the project source */
export const useFilteredBricks = (
  bricks: BrickT[],
  projectSource?: string
): BrickT[] => {
  const [filteredBricks, setFilteredBricks] = useState(bricks);

  // filter bricks by project
  const prevBricks = usePrevious(bricks);
  const prevProjectSource = usePrevious(projectSource);
  useEffect(() => {
    const didChange =
      !_.isEqual(prevBricks, bricks) ||
      !_.isEqual(prevProjectSource, projectSource);

    if (didChange) {
      const updatedBricks = bricks.filter(
        brick => !projectSource || brick.source === projectSource
      );
      setFilteredBricks(updatedBricks);
    }
  }, [bricks, projectSource]);

  return filteredBricks;
};

export const useBrickWithAcceptation = (
  bricks: BrickT[],
  getUserAcceptation: string => StatusT
): BrickT[] => {
  const [bricksWithAcceptation, setBricksWithAcceptation] = useState(bricks);

  const prevGetUserAcceptation = usePrevious(getUserAcceptation);
  const prevBricks = usePrevious(bricks);
  useEffect(() => {
    const didChange =
      !_.isEqual(prevBricks, bricks) ||
      prevGetUserAcceptation !== getUserAcceptation;

    if (didChange) {
      const updatedBricks = bricks.map(brick => ({
        ...brick,
        status: getUserAcceptation(brick.id)
      }));
      setBricksWithAcceptation(updatedBricks);
    }
  }, [bricks, getUserAcceptation]);

  return bricksWithAcceptation;
};
