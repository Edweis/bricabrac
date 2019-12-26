import _ from 'lodash';
import { useMemo } from 'react';
import { setFirestore } from '../firestore';
import { ConceptT, ConceptDepsT } from '../../constants/types';
import { useObservable } from '../../helpers/observable';
import { conceptDepsService } from '../../helpers/store';
import { getDeps } from './helpers';

export { getDeps };
export const CONCEPT_DEPS_COLLECTION = 'conceptDeps';

const useConceptObservable = () => useObservable(conceptDepsService.value);

export const useConceptDeps = (concept: ConceptT) => {
  const conceptDeps = useConceptObservable();
  const deps = useMemo(() => getDeps(conceptDeps, concept), [
    concept,
    conceptDeps,
  ]);
  return deps;
};

export const useConceptTags = (concept: ConceptT) => {
  const conceptDeps = useConceptObservable();
  const foundDeps = _.find(conceptDeps, dep => dep.name === concept);
  if (!foundDeps || !foundDeps.deps) return [];
  return foundDeps.deps;
};

export const setConceptDeps = (concept: ConceptDepsT) => {
  const enrichedConcept = {
    id: concept.name,
    datetime: new Date(),
    ...concept,
  };
  setFirestore(CONCEPT_DEPS_COLLECTION, enrichedConcept);
};
