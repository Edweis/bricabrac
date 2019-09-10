export const matchBrickWithSearch = (brick, search) =>
  brick.title.toLowerCase().includes(search.toLowerCase());
