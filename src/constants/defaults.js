import type { BrickT } from "./types";

export const DEFAULT_BRICK: BrickT = {
  id: "idBrick1",
  authorId: "idAuthor1",
  childrenConcepts: ["[Children Concept one]"],
  content: "[description]",
  datetime: new Date(),
  parentConcept: "[parent Concept]",
  source: "[source]",
  status: "none"
};

export const DEFAULT_BRICK_LIST = [];
