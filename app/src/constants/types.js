// @flow
export type ConceptT = string;
export type ConceptDepsT = {
  name: ConceptT,
  deps: ConceptT[],
  datetime: Date,
};
export type SourceT = string;
export type StatusT = 'accepted' | 'refused' | 'none';
export type BrickT = {
  id: string,
  childrenConcepts: ConceptT[],
  content: string,
  submitTime: Date,
  parentConcept: ConceptT,
  source: string,
  isDefinition: boolean,
};
export type UserT = { id: string, email: string };
export type CommentT = {
  id: string,
  author: string,
  text: string,
  datetime: Date,
};
export type AcceptationT = {
  id: string,
  brickId: string,
  userId: string,
  status: StatusT,
  datetime: Date,
};
export type ProjectSourceT = SourceT;
export type ProjectSetterT = [ProjectSourceT, (ProjectSourceT) => void];
export type ReadingTimeT = {
  startTime: Date,
  endTime: Date,
  startPage: number,
  endPage: number,
  source: SourceT,
};
