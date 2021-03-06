import { Injectable } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import { SearchParamsService } from '../../core/services/search-params/search-params.service';
import { Group } from '../../models/group';
import { UserFormItem } from '../../models/user';
import { AppState } from '../app-state';
import { groupActions } from './group.actions';

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

  public listUserGroups() {
    this.store.dispatch(groupActions.searchUserGroups({ callNum: 0 })); // TODO!
  }

  public selectGroup(groupId: string) {
    this.store.dispatch(groupActions.select({ groupId }));
  }

  public createGroupWithUsers(params: {
    group: Partial<Group>;
    users: Array<Partial<UserFormItem>>;
  }) {
    this.store.dispatch(groupActions.createGroupWithUsers(params));
  }
}
