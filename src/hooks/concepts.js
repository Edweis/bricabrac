import _ from 'lodash';
import { useContext, createContext, useMemo } from 'react';
import { useFirestore, setFirestore } from './helpers';
import { ConceptT, ConceptDepsT } from '../constants/types';

export const CONCEPT_DEPS_COLLECTION = 'conceptDeps';

export const ConceptContext = createContext([]);
export const useConceptContext = () => useContext(ConceptContext);

export const getDeps = (
  allDeps: ConceptDepsT[],
  concept: ConceptT,
  occurendConcept: ConceptT[] = []
): { deps: ConceptDepsT[], isCyclical: boolean } => {
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

export const useConcepts = () => useFirestore(CONCEPT_DEPS_COLLECTION);

export const useConceptDeps = (concept: ConceptT) => {
  const conceptDeps = useConceptContext();
  const deps = useMemo(() => getDeps(conceptDeps, concept), [
    concept,
    conceptDeps
  ]);
  return deps;
};
export const setConcepts = (concept: ConceptT) => {
  setFirestore(CONCEPT_DEPS_COLLECTION, concept);
};
