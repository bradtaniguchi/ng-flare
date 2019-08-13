import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ChangeDetectorRef
} from '@angular/core';
import { Card } from '../../models/card';

@Component({
  selector: 'app-flip-card',
  template: `
    <mat-card [class.back]="showBack">
      <mat-card-content>
        <p>
          <ng-container *ngIf="card">
            {{ showBack ? card.front : card.back }}
          </ng-container>
        </p>
      </mat-card-content>
    </mat-card>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlipCardComponent {
  @Input() showBack: boolean;
  @Input() card: Card;

  constructor(private cdr: ChangeDetectorRef) {}

  public toggle() {
    this.showBack = !this.showBack;
    this.cdr.detectChanges();
  }

  public set(showBack: boolean) {
    this.showBack = showBack;
    this.cdr.detectChanges();
  }
}
