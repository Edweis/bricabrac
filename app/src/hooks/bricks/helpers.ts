import * as _ from 'lodash';
import { useState, useEffect, useMemo } from 'react';
import { BrickT, ConceptT, BrickRawT, StatusT } from '../../constants/types';
import { usePrevious } from '../helpers';
import { useObservable } from '../../helpers/observable';
import { projectService } from '../../helpers/store';
import { useUserAcceptation } from '../acceptations';
import { getCurrentUserId } from '../../firebase';

/* Return bricks filtered with the project source */
export const useFilteredBricks = (
  bricks: BrickRawT[],
  concept?: ConceptT,
): BrickRawT[] => {
  const projectSource = useObservable(projectService.project);
  const filteredBricks = useMemo(
    () =>
      bricks
        .filter(brick => !concept || brick.parentConcept === concept)
        .filter(brick => !projectSource || brick.source === projectSource),
    [bricks, concept, projectSource],
  );
  return filteredBricks;
};

export const useBrickWithAcceptation = (bricks: BrickRawT[]): BrickT[] => {
  const userId = getCurrentUserId();
  const getUserAcceptation = useUserAcceptation(userId);
  const [bricksWithAcceptation, setBricksWithAcceptation] = useState<BrickT[]>(
    () => bricks.map(brick => ({ ...brick, status: StatusT.none })),
  );

  const prevGetUserAcceptation = usePrevious(getUserAcceptation);
  const prevBricks = usePrevious(bricks);
  useEffect(() => {
    const didChange =
      !_.isEqual(prevBricks, bricks) ||
      prevGetUserAcceptation !== getUserAcceptation;

    if (didChange) {
      const updatedBricks = bricks.map(brick => ({
        ...brick,
        status: getUserAcceptation(brick.author),
      }));
      setBricksWithAcceptation(updatedBricks);
    }
  }, [bricks, getUserAcceptation]);

  return bricksWithAcceptation;
};
