import { useMemo } from 'react';
import { BrickT, ConceptT } from '../../constants/types';
import { useObservable } from '../../helpers/observable';
import { projectService } from '../../helpers/store';

/* Return bricks filtered with the project source */
export const useFilteredBricks = (
  bricks: BrickT[],
  concept?: ConceptT,
): BrickT[] => {
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
