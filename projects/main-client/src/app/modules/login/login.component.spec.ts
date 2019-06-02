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

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  const getLoginWithGoogle = () => fixture.debugElement.query(By.css('button'));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [
        {
          provide: AuthFacadeService,
          useValue: {
            login: () => {}
          }
        }
      ],
      imports: [FlexLayoutModule, MatCardModule, MatButtonModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('login button should call loginFacade', inject(
    [AuthFacadeService],
    async (authFacade: AuthFacadeService) => {
      const spy = spyOn(authFacade, 'login');
      await fixture.whenStable();
      const loginWithGoogle = getLoginWithGoogle().nativeElement;
      loginWithGoogle.dispatchEvent(new Event('click'));

      expect(spy).toHaveBeenCalled();
    }
  ));
});
