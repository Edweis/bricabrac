import { useMemo, useEffect } from 'react';
import _ from 'lodash';
import { useNavigation } from '../../hooks/navigation';
import { useBrickContext, useConceptDeps } from '../../hooks';
import { matchBrickSearch } from '../../helpers';

export const useDisplayedConcepts = (search: string) => {
  const bricks = useBrickContext();
  const conceptDeps = useConceptDeps();

  return useMemo(() => {
    const parentConceptBricks = _(bricks).map(brick => ({
      ...brick,
      submitTime: brick.submitTime.toMillis(),
      concept: brick.parentConcept
    }));
    const orphanConceptBricks = _(bricks)
      .map(brick =>
        brick.childrenConcepts.map(childConcept => ({
          ...brick,
          submitTime: brick.submitTime.toMillis(),
          concept: childConcept
        }))
      )
      .flatten()
      .value();
    const conceptFromDeps = _(conceptDeps.deps)
      .map(dep => [dep.name, ...dep.deps])
      .flatten()
      .value();

    const sortedConcepts = parentConceptBricks
      .union(orphanConceptBricks)
      .union(conceptFromDeps)
      .filter(brick => matchBrickSearch(brick, search))
      .sortBy(['submitTime'])
      .reverse() // latest first
      .uniqBy('concept') // take the latest concept edited
      .map('concept')
      .value();

    // Add the search as a concept we can add
    if (search.trim() !== '') sortedConcepts.unshift(search.trim());
    return sortedConcepts;
  }, [bricks, search]);
};

export const useNavigationEvent = (event: string, cb: any => void) => {
  const navigation = useNavigation();
  useEffect(() => {
    const subscription = navigation.addListener('willFocus', cb);
    return () => subscription.remove();
  }, [navigation]);
};
