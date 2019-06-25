import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Group } from '../../../models/group';
import { AppState } from '../../../app-store/app-state';
import { GroupFacadeService } from '../../../app-store/group/group.facade';
import { Store, select } from '@ngrx/store';
import { SearchParams } from '../../../models/search-params';

@Component({
  selector: 'app-groups-list',
  template: `
    <div fxLayout="column" fxLayoutGap="16px" class="margin">
      <div fxLayout="row" fxLayoutAlign="center center">
        <ng-container *ngIf="groups$ | async as groups; else showLoading">
          <ng-container *ngFor="let group of groups">
            <mat-card fxFlex="50" class="hover-hide">
              <a [routerLink]="[group.uid]">
                <mat-card-title fxLayout="row" fxLayoutAlign="space-between">
                  <div fxLayout="row" fxLayoutAlign="start center">
                    <mat-icon>group</mat-icon>
                    <span>{{ group.name }}</span>
                  </div>
                </mat-card-title>
              </a>
            </mat-card>
          </ng-container>
        </ng-container>
        <ng-template #showLoading>
          <app-loading-spinner> </app-loading-spinner>
        </ng-template>
      </div>
    </div>
    <app-create-fab [route]="['create']"> </app-create-fab>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupsListComponent implements OnInit {
  public groups$: Observable<Group[]>;
  constructor(
    private store: Store<AppState>,
    private groupFacade: GroupFacadeService
  ) {}

  ngOnInit() {
    this.groups$ = this.observeGroups({
      limit: 2,
      orderBy: 'name'
    });
  }

  private observeGroups(params: Partial<SearchParams<Group>>) {
    this.groupFacade.listUserGroups(params);
    return this.store.pipe(select(this.groupFacade.searchGroups(), params));
  }
}
