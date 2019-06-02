import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { logger } from '../../core/logger';
import { AuthFacadeService } from '../../app-store/auth/auth-facade.service';

@Component({
  selector: 'app-login',
  template: `
    <div fxLayout="column" fxLayoutAlign="center center" style="height: 100%">
      <mat-card>
        <mat-card-content>
          <button
            class="large-button"
            type="button"
            (click)="login()"
            mat-raised-button
            color="primary"
          >
            Login With Google
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
  constructor(private authFacadeService: AuthFacadeService) {}

  ngOnInit() {}

  login() {
    logger.log('login clicked');
    this.authFacadeService.login('popup');
  }
}
