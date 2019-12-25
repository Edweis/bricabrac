import _ from 'lodash';
import { useState, useEffect } from 'react';
import { BrickT, StatusT } from '../../constants/types';
import { usePrevious } from '../helpers';
import { useObservable } from '../../helpers/observable';
import { projectService } from '../../helpers/store';

/* Return bricks filtered with the project source */
export const useFilteredBricks = (bricks: BrickT[]): BrickT[] => {
  const [filteredBricks, setFilteredBricks] = useState(bricks);
  const projectSource = useObservable(projectService.project);

  // filter bricks by project
  const prevBricks = usePrevious(bricks);
  const prevProjectSource = usePrevious(projectSource);
  useEffect(() => {
    const didChange =
      !_.isEqual(prevBricks, bricks) ||
      !_.isEqual(prevProjectSource, projectSource);

    if (didChange) {
      const updatedBricks = bricks.filter(
        brick => !projectSource || brick.source === projectSource,
      );
      setFilteredBricks(updatedBricks);
    }
  }, [bricks, projectSource]);

  return filteredBricks;
};

export const useBrickWithAcceptation = (
  bricks: BrickT[],
  getUserAcceptation: (userId: string) => StatusT,
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
        status: getUserAcceptation(brick.author),
      }));
      setBricksWithAcceptation(updatedBricks);
    }
  }, [bricks, getUserAcceptation]);

  return bricksWithAcceptation;
};
