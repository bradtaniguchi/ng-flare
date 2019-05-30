import { Injectable } from '@angular/core';
import { Store, createSelector } from '@ngrx/store';
import { SearchParamsService } from '../../core/services/search-params/search-params.service';
import { AppState } from '../app-state';
import { SearchParams } from '../../models/search-params';
import { GetGroups } from './group.actions';
import { Group } from '../../models/group';

@Injectable({
  providedIn: 'root'
})
export class GroupFacadeService {
  public getLoading = this.searchParamsService.createLoadingSelector(
    state => state.group.loading
  );
  public getGroups = this.searchParamsService.createEntitiesSelector(
    state => state.group.ids,
    state => state.group.entities
  );
  public getOrderBy = this.searchParamsService.createOrderBySelector<Deck>(
    state => state.group.orderBy
  );
  public getLimit = this.searchParamsService.createLimitSelector(
    state => state.group.limit
  );
  constructor(
    private store: Store<AppState>,
    private searchParamsService: SearchParamsService
  ) {}

  public getGroupSelector(groupId: string) {
    return createSelector(
      (state: AppState) => state.group.entities[groupId],
      _ => _
    );
  }

  public searchGroups(params: Partial<SearchParams<Group>>) {
    this.store.dispatch(new GetGroups(params));
  }
}
