import { Observable } from '../observable';
import { ProjectT } from '../../constants/types';

export default class ProjectService {
  readonly project = new Observable<ProjectT>(null);

  reset() {
    this.project.set(null);
  }

  set(project: ProjectT) {
    this.project.set(project);
  }
}
