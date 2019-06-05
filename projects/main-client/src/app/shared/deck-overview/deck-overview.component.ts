import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input
} from '@angular/core';
import { Deck } from '../../models/deck';

@Component({
  selector: 'app-deck-overview',
  template: `
    <mat-card class="hover-hide">
      <mat-card-title>
        <div fxLayout="row" fxLayoutAlign="start center">
          <mat-icon>assignment</mat-icon>
          <span>{{ deck?.name }}</span>
        </div>
      </mat-card-title>
      <mat-card-content>
        <p>
          {{ deck?.description }}
        </p>
      </mat-card-content>
      <mat-card-actions align="end">
        <a
          *ngIf="canEdit"
          type="button"
          mat-button
          color="primary"
          class="hover-hide-el"
          [routerLink]="['deck', deck?.uid]"
        >
          Edit
        </a>
        <a
          type="button"
          mat-button
          color="primary"
          class="hover-hide-el"
          [routerLink]="['study', deck?.uid]"
        >
          Study
        </a>
      </mat-card-actions>
    </mat-card>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeckOverviewComponent implements OnInit {
  @Input() deck: Deck;
  @Input() canEdit: boolean;
  constructor() {}

  ngOnInit() {}
}
