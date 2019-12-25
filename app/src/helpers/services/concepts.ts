import { Observable } from '../observable';
import { ConceptT } from '../../constants/types';

export default class ConceptsService {
  readonly concepts = new Observable<ConceptT[]>([]);
}
