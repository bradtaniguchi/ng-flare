import {
  async,
  ComponentFixture,
  TestBed,
  inject
} from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { MatCardModule, MatButtonModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AuthFacadeService } from '../../app-store/auth/auth-facade.service';
import { By } from '@angular/platform-browser';
import { EnvironmentService } from '../../core/services/environment/environment.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  const getLoginWithGoogle = () => fixture.debugElement.query(By.css('button'));

  const getLoginWithGithub = () =>
    fixture.debugElement.queryAll(By.css('button'))[1];

  const getLoginWithEmail = () =>
    fixture.debugElement.queryAll(By.css('button'))[2];

  const getEmailInput = () =>
    fixture.debugElement.query(By.css('input[name="email"]'));
  const getPasswordInput = () =>
    fixture.debugElement.query(By.css('input[name="password"]'));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [
        {
          provide: AuthFacadeService,
          useValue: {
            login: () => {}
          }
        },
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({ useRedirect: false })
          }
        },
        EnvironmentService
      ],
      imports: [
        RouterTestingModule,
        // angular
        FlexLayoutModule,
        MatCardModule,
        MatButtonModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('google login button should call loginFacade', inject(
    [AuthFacadeService],
    async (authFacade: AuthFacadeService) => {
      const spy = spyOn(authFacade, 'login');
      await fixture.whenStable();
      fixture.detectChanges();
      const loginWithGoogle = getLoginWithGoogle().nativeElement;
      loginWithGoogle.dispatchEvent(new Event('click'));

      expect(spy).toHaveBeenCalled();
    }
  ));
  it('github login button', inject(
    [AuthFacadeService],
    async (authFacade: AuthFacadeService) => {
      const spy = spyOn(authFacade, 'login');
      await fixture.whenStable();
      fixture.detectChanges();
      const loginWithGithub = getLoginWithGithub().nativeElement;
      loginWithGithub.dispatchEvent(new Event('click'));

      expect(spy).toHaveBeenCalled();
    }
  ));

  it('login with email is not shown if allowEmailLogin is false', inject(
    [EnvironmentService],
    async (environmentService: EnvironmentService) => {
      spyOn(environmentService, 'get').and.returnValue({
        allowEmailLogin: false
      });
      await fixture.whenStable();
      const loginWithEmail = getLoginWithEmail();
      expect(loginWithEmail).toBeFalsy();
    }
  ));
  it('login with email is shown if allowEmailLogin is true', inject(
    [EnvironmentService],
    async (environmentService: EnvironmentService) => {
      spyOn(environmentService, 'get').and.returnValue({
        allowEmailLogin: true
      });
      fixture.detectChanges();
      await fixture.whenStable();
      const loginWithEmail = getLoginWithEmail();
      expect(loginWithEmail).toBeTruthy();
    }
  ));

  it('login email input is shown if allowEmailLogin is true', inject(
    [EnvironmentService],
    async (environmentService: EnvironmentService) => {
      spyOn(environmentService, 'get').and.returnValue({
        allowEmailLogin: true
      });
      fixture.detectChanges();
      await fixture.whenStable();
      const emailInput = getEmailInput();
      expect(emailInput).toBeTruthy();
    }
  ));

  it('login password input is shown if allowEmailLogin is true', inject(
    [EnvironmentService],
    async (environmentService: EnvironmentService) => {
      spyOn(environmentService, 'get').and.returnValue({
        allowEmailLogin: true
      });
      fixture.detectChanges();
      await fixture.whenStable();
      const passwordInput = getPasswordInput();
      expect(passwordInput).toBeTruthy();
    }
  ));

  it('login email input is hidden if allowEmailLogin is false', inject(
    [EnvironmentService],
    async (environmentService: EnvironmentService) => {
      spyOn(environmentService, 'get').and.returnValue({
        allowEmailLogin: false
      });
      fixture.detectChanges();
      await fixture.whenStable();
      const emailInput = getEmailInput();
      expect(emailInput).toBeFalsy();
    }
  ));

  it('login password input is hidden if allowEmailLogin is false', inject(
    [EnvironmentService],
    async (environmentService: EnvironmentService) => {
      spyOn(environmentService, 'get').and.returnValue({
        allowEmailLogin: false
      });
      fixture.detectChanges();
      await fixture.whenStable();
      const passwordInput = getPasswordInput();
      expect(passwordInput).toBeFalsy();
    }
  ));
});
