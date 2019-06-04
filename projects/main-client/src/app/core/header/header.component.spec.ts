import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatButtonModule,
  MatIconModule,
  MatProgressBarModule,
  MatToolbarModule
} from '@angular/material';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderComponent } from './header.component';
import { UserIconModule } from '../../shared/user-icon/user-icon.module';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  const getProgressBar = () =>
    fixture.debugElement.query(By.css('mat-progress-bar'));

  const getGroupName = () =>
    fixture.debugElement.queryAll(By.css('.mat-title'))[1];

  const getToggle = () =>
    fixture.debugElement.query(By.css('button[mat-icon-button]'));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [
        // app modules
        UserIconModule,
        // angular material
        FlexLayoutModule,
        MatIconModule,
        MatToolbarModule,
        MatButtonModule,
        RouterTestingModule,
        MatProgressBarModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows progress bar if loading is true', async () => {
    component.loading = true;
    fixture.detectChanges();
    const progressBar = getProgressBar();
    expect(progressBar).toBeTruthy();
  });
  it('does not show progress bar if loading is false', () => {
    component.loading = false;
    fixture.detectChanges();
    const progressBar = getProgressBar();
    expect(progressBar).toBeFalsy();
  });
  it('shows group name if given', () => {
    component.group = {
      name: 'group name'
    } as any;
    fixture.detectChanges();
    const groupName = getGroupName().nativeElement;
    console.log('group name', groupName);
    expect(groupName.textContent.trim()).toEqual('group name');
  });
  it('does not show group name if not given', async () => {
    await fixture.whenStable();
    const groupName = getGroupName();
    expect(groupName).toBeFalsy();
  });
  it('emits toggle menu on menu click', () => {
    const spy = spyOn(component.toggleMenu, 'emit');
    const toggle = getToggle().nativeElement;
    toggle.dispatchEvent(new MouseEvent('click'));

    expect(spy).toHaveBeenCalled();
  });
});
