import {
  ProjectService,
  ConceptDepsService,
  UsersService,
  BricksService,
} from './services';

export const projectService = new ProjectService();
export const conceptDepsService = new ConceptDepsService();
export const usersService = new UsersService();
export const bricksService = new BricksService();
