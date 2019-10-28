// @flow
export type ConceptT = string;
export type SourceT = string;
export type StatusT = 'accepted' | 'refused' | 'none';
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
export type UserT = { uid: string, email: string };
export type CommentT = {
  id: string,
  author: string,
  text: string,
  datetime: Date
};
