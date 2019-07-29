import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { AppState } from '../../../app-store/app-state';
import { DeckFacadeService } from '../../../app-store/deck/deck.facade';
import { GroupFacadeService } from '../../../app-store/group/group.facade';
import { logger } from '../../../core/logger';
import { Deck } from '../../../models/deck';
import { Group } from '../../../models/group';
import {
  CallNumService,
  CallNum
} from '../../../core/services/call-num/call-num.service';

@Component({
  selector: 'app-study-deck-list',
  template: `
    <div class="margin">
      <div
        fxLayout="row"
        fxLayoutAlign="start center"
        fxLayoutGap="16px"
        class="vert-margin"
      >
        <!-- TODO: add deck selector here -->
        <ng-container
          *ngIf="showGroupSelector$ | async; else showReadonlyGroup"
        >
          <mat-form-field>
            <mat-label>
              Group
            </mat-label>
            <mat-select
              matInput
              (selectionChange)="onGroupChange($event)"
              [value]="group$ | async"
              [compareWith]="compareGroupWith"
            >
              <mat-option
                *ngFor="let group of groups$ | async"
                [value]="group"
                >{{ group.name }}</mat-option
              >
            </mat-select>
          </mat-form-field>
          <button
            type="button"
            mat-icon-button
            (click)="showGroupSelector$.next(false)"
          >
            <mat-icon>close</mat-icon>
          </button>
        </ng-container>
        <ng-template #showReadonlyGroup>
          <h2 class="mat-title no-margin">
            {{ (group$ | async)?.name }}
          </h2>
          <button
            mat-button
            type="button"
            (click)="showGroupSelector$.next(true)"
          >
            Change Group
          </button>
        </ng-template>
      </div>
      <!-- TODO add change group settings here -->
      <div fxLayout="row wrap" fxLayoutGap="16px grid">
        <ng-container *ngIf="decks$ | async as decks; else showLoading">
          <ng-container *ngIf="decks && !decks.length">
            no decks for the given group
            <!-- TODO: show no-items -->
          </ng-container>
          <ng-container *ngFor="let deck of decks">
            <div fxFlex="calc(25% - 16px)">
              <app-deck-overview [deck]="deck"></app-deck-overview>
            </div>
          </ng-container>
        </ng-container>
        <ng-template #showLoading>
          <app-loading-spinner></app-loading-spinner>
        </ng-template>
      </div>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudyDeckListComponent implements OnInit, OnDestroy {
  // all groups the user has access to
  public groups$: Observable<Group[]>;
  public decks$: Observable<Deck[]>;
  // if we are to show the groupSelector field or not
  // its a behavior subject only if we are to hook into its changes
  public showGroupSelector$ = new BehaviorSubject<boolean>(false);
  public group$: Observable<Group>;

  private callNum: CallNum;
  constructor(
    private store: Store<AppState>,
    private groupFacade: GroupFacadeService,
    private deckFacade: DeckFacadeService,
    private callNumService: CallNumService
  ) {}

  ngOnInit() {
    logger.log('in study-deck-list component');
    this.group$ = this.observeGroup();
    this.groups$ = this.observeGroups();
    this.decks$ = this.observeDecks(this.group$);
    this.callNum = this.callNumService.createCallNum();
  }

  ngOnDestroy() {
    this.callNum.clear();
  }

  public onGroupChange(event: MatSelectChange) {
    const group: Group = event.value;
    if (!group || !group.uid) {
      logger.error('no group given', { group });
      return;
    }
    const groupId = (event.value as Group).uid;
    this.groupFacade.selectGroup(groupId);
    this.showGroupSelector$.next(false);
  }

  public compareGroupWith(a: Group, b: Group) {
    return a && b && a.uid === b.uid;
  }

  private observeGroup() {
    return this.store.pipe(select(this.groupFacade.getSelected));
  }

  private observeGroups() {
    return this.store.pipe(select(this.groupFacade.getGroups));
  }

  private observeDecks(group$: Observable<Group>) {
    return group$.pipe(
      filter(_ => !!_),
      map(({ uid }) => uid),
      tap(groupId =>
        this.deckFacade.listGroupDecks({
          filters: [
            {
              prop: 'group',
              op: '==',
              value: groupId
            }
          ],
          limit: 20,
          orderBy: 'name',
          callNum: this.callNum.get()
        })
      ),
      switchMap(groupId =>
        this.store.pipe(select(this.deckFacade.getDecksByGroup, { groupId }))
      )
    );
  }
}
