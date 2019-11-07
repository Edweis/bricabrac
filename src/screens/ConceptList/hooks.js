import { useMemo, useEffect } from 'react';
import _ from 'lodash';
import { useNavigation } from '../../hooks/navigation';
import { useBrickContext } from '../../hooks';
import { matchBrickSearch } from '../../helpers';

const TODO_CONCEPT = '#TODO';

export const useDisplayedConcepts = (search: string) => {
  const bricks = useBrickContext();

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

    const sortedConcepts = parentConceptBricks
      .union(orphanConceptBricks)
      .filter(brick => matchBrickSearch(brick, search))
      .sortBy(['submitTime'])
      .reverse() // latest first
      .uniqBy('concept') // take the latest concept edited
      .map('concept')
      .value();

    // Set #TODO concept on top if it exists
    if (sortedConcepts.includes(TODO_CONCEPT)) {
      const conceptsWithTodoOnTop = sortedConcepts.filter(
        c => c !== TODO_CONCEPT
      );
      conceptsWithTodoOnTop.splice(0, 0, TODO_CONCEPT);
      return conceptsWithTodoOnTop;
    }

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
