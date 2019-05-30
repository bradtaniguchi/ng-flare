import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  template: `
    <div fxLayoutAlign="center center" fxLayout="column" class="margin-top">
      <mat-spinner color="primary" [value]="50"> </mat-spinner>
    </div>
  `,
  styles: [
    `
      .margin-top {
        margin-top: 64px;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingSpinnerComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
