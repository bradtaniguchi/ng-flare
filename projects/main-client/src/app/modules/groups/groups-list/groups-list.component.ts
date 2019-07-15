import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../../app-store/app-state';
import { GroupFacadeService } from '../../../app-store/group/group.facade';
import { Group } from '../../../models/group';

@Component({
  selector: 'app-groups-list',
  template: `
    <div fxLayout="column" fxLayoutGap="16px" class="margin">
      <div fxLayout="column" fxLayoutAlign="center center" fxLayoutGap="8px">
        <ng-container *ngIf="groups$ | async as groups; else showLoading">
          <ng-container *ngFor="let group of groups">
            <div class="full-width" fxLayout="row" fxLayoutAlign="center">
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
            </div>
          </ng-container>
        </ng-container>
        <ng-template #showLoading>
          <app-loading-spinner> </app-loading-spinner>
        </ng-template>
      </div>
    </div>
    <app-create-fab [route]="['create']" [title]="'Create Group'">
    </app-create-fab>
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
    this.groups$ = this.observeGroups();
  }

  private observeGroups() {
    this.groupFacade.listUserGroups();
    return this.store.pipe(
      select(this.groupFacade.searchGroups(), { limit: 2, orderBy: 'name' })
    );
  }
}
