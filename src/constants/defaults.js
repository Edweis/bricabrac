import firebase from "firebase/app";
import type { BrickT } from "./types";

export const DEFAULT_BRICK: BrickT = {
  id: "idBrick1",
  authorId: "idAuthor1",
  childrenConcepts: [],
  content: "loading content ...",
  datetime: firebase.firestore.Timestamp.now(),
  parentConcept: "loading concept ...",
  source: "loading source ...",
  status: "none"
};

export const DEFAULT_CONCEPT = {
  title: "loading concept ..."
};
