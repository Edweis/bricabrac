import { ConceptDepsT, ConceptT } from '../../constants/types';

export declare const CONCEPT_DEPS_COLLECTION = 'conceptDeps';
export declare const useConceptDeps: (
  concept: string,
) => {
  deps: string[];
  isCyclical: boolean;
};
export declare const useConceptTags: (concept: ConceptT) => string[];
export declare const setConceptDeps: (concept: ConceptDepsT) => void;
