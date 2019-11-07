import { useMemo, useEffect, useContext } from 'react';
import _ from 'lodash';
import { NavigationContext } from 'react-navigation';
import { useBrickContext } from '../../hooks';
import { matchSearch } from '../../helpers';

const TODO_CONCEPT = '#TODO';

export const useDisplayedConcepts = (search: string) => {
  const bricks = useBrickContext();

  const sortedConcepts = useMemo(() => {
    const parentConceptBlocks = _(bricks).map(brick => ({
      submitTime: brick.submitTime.toMillis(),
      concept: brick.parentConcept
    }));
    const orphanConceptBlocks = _(bricks)
      .map(brick =>
        brick.childrenConcepts.map(childConcept => ({
          submitTime: brick.submitTime.toMillis(),
          concept: childConcept
        }))
      )
      .flatten()
      .value();

    const sortedConceptsRaw = parentConceptBlocks
      .union(orphanConceptBlocks)
      .sortBy(['submitTime'])
      .reverse() // latest first
      .uniqBy('concept') // take the latest concept edited
      .map('concept')
      .value();

    // Set #TODO concept on top if it exists
    if (sortedConceptsRaw.includes(TODO_CONCEPT)) {
      const conceptsWithTodoOnTop = sortedConceptsRaw.filter(
        c => c !== TODO_CONCEPT
      );
      conceptsWithTodoOnTop.splice(0, 0, TODO_CONCEPT);
      return conceptsWithTodoOnTop;
    }
    return sortedConceptsRaw;
  }, [bricks]);

  return useMemo(() => {
    const concepts = sortedConcepts.filter(concept =>
      matchSearch(concept, search)
    );
    if (search.trim() !== '') concepts.unshift(search.trim());
    return concepts;
  }, [sortedConcepts, search]);
};

export const useNavigationEvent = (event: string, cb: any => void) => {
  const navigation = useContext(NavigationContext);
  useEffect(() => {
    const subscription = navigation.addListener('willFocus', cb);
    return () => subscription.remove();
  }, [navigation]);
};
