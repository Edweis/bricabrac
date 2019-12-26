import _ from 'lodash';
import {
  ConceptT,
  ConceptDepsT,
  ConceptAnalysisT,
} from '../../constants/types';

export const getDeps = (
  allDeps: ConceptDepsT[],
  concept: ConceptT,
  occurendConcept: ConceptT[] = [],
): ConceptAnalysisT => {
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
    return _.concat(dep, ...subDeps.deps);
  });

  const deps = _(childrenConcepts)
    .flatten()
    .uniq()
    .value();

  return { deps, isCyclical };
};
