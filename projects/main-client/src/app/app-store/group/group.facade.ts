import { Injectable } from '@angular/core';
import { Store, createSelector, select } from '@ngrx/store';
import { SearchParamsService } from '../../core/services/search-params/search-params.service';
import { AppState } from '../app-state';
import { SearchParams } from '../../models/search-params';
import { ListUserGroups } from './group.actions';
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
  public getSelected = createSelector(
    (state: AppState) => state.group.selected,
    (state: AppState) => state.group.entities,
    (selected, groups) => groups && selected && groups[selected]
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

  public searchGroups() {
    return this.searchParamsService.search<Group>(
      state => state.group.entities
    );
  }

  public listUserGroups(params: Partial<SearchParams<Group>>) {
    this.store.dispatch(new ListUserGroups(params));
  }
}
