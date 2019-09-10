// @flow
export type ConceptT = string;
export type StatusT = "accepted" | "refused" | "none";
export type BrickT = {
  id: string,
  authorId: string,
  childrenConcepts: ConceptT[],
  content: string,
  datetime: Date,
  parentConcept: ConceptT,
  source: string,
  status: StatusT
};
