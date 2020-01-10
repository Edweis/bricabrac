/* eslint-disable max-classes-per-file */
import _ from 'lodash';
import { Observable } from '../observable';
import { CollectionE, LoadingT } from '../../constants/types';

export class LoadingService {
  readonly loadings = new Observable<LoadingT>({ shouldLoadAgain: true });

  isLoading() {
    const { loadings } = this;
    const loadingObject = loadings.get();
    if (!loadingObject.shouldLoadAgain) return false;
    const values = _(loadingObject)
      .omit('shouldLoadAgain')
      .values()
      .value();
    const isLoading = values.length === 0 || values.some(value => value);
    if (!isLoading) loadings.update({ shouldLoadAgain: false });
    return isLoading;
  }

  set(collection: CollectionE | string, status: boolean) {
    const { loadings } = this;
    loadings.update({ [collection]: status });
  }
}
