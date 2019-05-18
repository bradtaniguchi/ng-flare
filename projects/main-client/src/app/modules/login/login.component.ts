import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { logger } from '../../core/logger';

@Component({
  selector: 'app-login',
  template: `
    <div>
      <mat-card>
        <mat-card-content>
          <button
            class="large-button"
            type="button"
            (click)="login()"
            mat-raised-button
            color="primary"
          >
            Login
          </button>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [
    `
      .large-button {
        height: 50px;
        width: 200px;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  login() {
    logger.log('login clicked');
  }
}
