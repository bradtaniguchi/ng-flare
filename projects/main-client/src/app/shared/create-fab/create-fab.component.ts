import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  Input
} from '@angular/core';

@Component({
  selector: 'app-create-fab',
  template: `
    <a
      mat-fab
      type="button"
      aria-label="Create"
      [routerLink]="route"
      color="primary"
    >
      <mat-icon>
        add
      </mat-icon>
    </a>
  `,
  styles: [
    `
      :host {
        position: absolute;
        right: 32px;
        bottom: 32px;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateFabComponent implements OnInit {
  @Input() route: string[] | string;
  constructor() {}

  ngOnInit() {}
}
