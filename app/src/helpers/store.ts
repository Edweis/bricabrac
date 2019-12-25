import {
  ProjectService,
  ConceptDepsService,
  UsersService,
  BricksService,
  AcceptationService,
} from './services';

export const projectService = new ProjectService();
export const conceptDepsService = new ConceptDepsService();
export const usersService = new UsersService();
export const bricksService = new BricksService();
export const acceptationService = new AcceptationService();
