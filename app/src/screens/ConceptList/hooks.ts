import { useMemo, useEffect } from 'react';
import _ from 'lodash';
import { useNavigation } from '../../hooks/navigation';
import { useBricks } from '../../hooks';
import { matchBrickSearch } from '../../helpers';

export const useDisplayedConcepts = (search: string) => {
  const bricks = useBricks();

  return useMemo(() => {
    const parentConceptBricks = _(bricks).map(brick => ({
      ...brick,
      submitTime: brick.submitTime.toMillis(),
      concept: brick.parentConcept,
    }));
    const orphanConceptBricks = _(bricks)
      .map(brick =>
        brick.childrenConcepts.map(childConcept => ({
          ...brick,
          submitTime: brick.submitTime.toMillis(),
          concept: childConcept,
        })),
      )
      .flatten()
      .value();

    const sortedConcepts = parentConceptBricks
      .union(orphanConceptBricks)
      .filter(brick => matchBrickSearch(brick, search))
      .sortBy(['submitTime'])
      .reverse() // latest first
      .map('concept')
      .uniq() // remove duplicates
      .value();

    // Add the search as a concept we can add
    if (search.trim() !== '') sortedConcepts.unshift(search.trim());
    return sortedConcepts;
  }, [bricks, search]);
};

type NavEvents = 'willBlur' | 'willFocus' | 'didFocus' | 'didBlur';
export const useNavigationEvent = (
  event: NavEvents,
  cb: (value: any) => void,
) => {
  const navigation = useNavigation();
  useEffect(() => {
    const subscription = navigation.addListener(event, cb);
    return () => subscription.remove();
  }, [navigation]);
};
