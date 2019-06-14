import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { logger } from '../../core/logger';
import { AuthFacadeService } from '../../app-store/auth/auth-facade.service';
import { LoginProvider } from '../../models/login-providers';
import { EnvironmentService } from '../../core/services/environment/environment.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  template: `
    <div fxLayout="column" fxLayoutAlign="center center" style="height: 100%">
      <mat-card>
        <mat-card-content fxLayout="column" fxLayoutGap="6px">
          <button
            class="large-button"
            type="button"
            (click)="loginWithGoogle()"
            mat-raised-button
            color="primary"
          >
            Login With Google
          </button>
          <button
            class="large-button"
            type="button"
            (click)="loginWithGithub()"
            mat-raised-button
            color="primary"
          >
            Login With Github
          </button>
          <ng-container *ngIf="allowEmailLogin">
            <label for="email">Email</label>
            <input
              aria-label="Testing Email Input"
              type="text"
              #emailInput
              name="email"
            />
            <label for="password">Password</label>
            <input
              aria-label="Testing Password Input"
              type="password"
              #passwordInput
              name="password"
            />
            <button
              class="large-button"
              type="button"
              (click)="loginWithEmail(emailInput.value, passwordInput.value)"
              mat-raised-button
              color="primary"
            >
              Login With Email
            </button>
          </ng-container>
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
  public allowEmailLogin: boolean;
  public useRedirect$: Observable<boolean>;
  constructor(
    private route: ActivatedRoute,
    private authFacadeService: AuthFacadeService,
    private environment: EnvironmentService
  ) {}

  ngOnInit() {
    this.allowEmailLogin = !!this.environment.get().allowEmailLogin;
    this.useRedirect$ = this.route.queryParams.pipe(
      map(queryParams => !!queryParams.useRedirect)
    );
  }

  loginWithGoogle() {
    logger.log('login with google clicked');
    this.useRedirect$.pipe(take(1)).subscribe(useRedirect =>
      this.authFacadeService.login({
        type: useRedirect ? 'redirect' : 'popup',
        provider: LoginProvider.GOOGLE
      })
    );
  }

  loginWithGithub() {
    logger.log('login with github clicked');
    this.useRedirect$.pipe(take(1)).subscribe(useRedirect =>
      this.authFacadeService.login({
        type: useRedirect ? 'redirect' : 'popup',
        provider: LoginProvider.GITHUB
      })
    );
  }

  loginWithEmail(email: string, password: string) {
    logger.log('test with login with email: ', email, password);
    logger.log('login with email clicked');
    // TODO:
    this.authFacadeService.loginWithEmail({ email, password });
  }
}
