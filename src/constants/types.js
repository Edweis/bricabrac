// @flow
export type ConceptT = string;
export type SourceT = string;
export type StatusT = 'accepted' | 'refused' | 'none';
export type BrickT = {
  id: string,
  authorId: string,
  childrenConcepts: ConceptT[],
  content: string,
  submitTime: Date,
  parentConcept: ConceptT,
  source: string
  // status: StatusT
};
export type UserT = { id: string, email: string };
export type CommentT = {
  id: string,
  author: string,
  text: string,
  datetime: Date
};
export type AcceptationT = {
  id: string,
  brickId: string,
  userId: string,
  status: StatusT,
  datetime: Date
};
