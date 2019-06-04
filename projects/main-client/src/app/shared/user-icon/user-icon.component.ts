import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input
} from '@angular/core';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-icon',
  template: `
    <img *ngIf="user" [src]="user.photoURL" [title]="user.displayName" />
  `,
  styles: [
    `
      :host {
        height: 40px;
      }
    `,
    `
      img {
        height: 40px;
        width: 40px;
        border-radius: 20px;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserIconComponent implements OnInit {
  @Input() user: User;
  constructor() {}

  ngOnInit() {}
}
