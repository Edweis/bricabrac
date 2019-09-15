import type { BrickT } from "../../constants/types";

export const getBrickError = (brick: BrickT): string | null => {
  if (!brick.content) return "Invalid content";
  return null;
};

export const a = 1;
