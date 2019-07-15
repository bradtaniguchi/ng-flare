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
    <img
      *ngIf="user"
      [src]="user.photoURL"
      [title]="user.displayName"
      class="user-avatar"
    />
  `,
  styles: [
    `
      :host {
        height: 40px;
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
