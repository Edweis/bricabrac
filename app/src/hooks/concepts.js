import _ from 'lodash';
import { useMemo } from 'react';
import { useFirestore, setFirestore } from './firestore';
import { ConceptT, ConceptDepsT } from '../constants/types';
import { useObservable } from '../helpers/observable';
import { conceptDepsService } from '../helpers/store';

export const CONCEPT_DEPS_COLLECTION = 'conceptDeps';

export const getDeps = (
  allDeps: ConceptDepsT[],
  concept: ConceptT,
  occurendConcept: ConceptT[] = [],
): { deps: ConceptDepsT[], isCyclical: boolean } => {
  // edge case
  if (!concept) return { deps: [], isCyclical: false };

  // detect cycle
  if (occurendConcept.includes(concept)) return { deps: [], isCyclical: true };

  // find concept
  const foundDeps = _.find(allDeps, dep => dep.name === concept);
  if (!foundDeps || !foundDeps.deps) return { deps: [], isCyclical: false };

  let isCyclical = false;
  const updatedOccurendConcept = occurendConcept.concat(concept);

  const childrenConcepts = foundDeps.deps.map(dep => {
    const subDeps = getDeps(allDeps, dep, updatedOccurendConcept);
    if (subDeps.isCyclical) isCyclical = true;
    return [dep].concat(subDeps.deps);
  });
  const deps = _(childrenConcepts)
    .flatten()
    .uniq()
    .value();

  return { deps, isCyclical };
};

export const useConceptDeps = (concept: ConceptT) => {
  const conceptDeps = useObservable(conceptDepsService.value);
  const deps = useMemo(() => getDeps(conceptDeps, concept), [
    concept,
    conceptDeps,
  ]);
  return deps;
};

export const useConceptTags = (concept: ConceptT) => {
  const conceptDeps = useObservable(conceptDepsService.value);
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
