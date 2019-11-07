import type { StatusT, RelationshipT } from './types';

export const translateStatus: { [StatusT]: string } = {
  accepted: 'acceptée',
  refused: 'réfutée',
  none: 'sans avis'
};

export const translateRelationship: { [RelationshipT]: string } = {
  deduction: 'déduction ->X',
  implication: 'suffisant X->',
  partition: 'partition X=A+B',
  definition: 'définition X=A',
  undefined: 'non définie'
};
export const a = 1;
