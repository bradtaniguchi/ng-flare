import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { SideNavComponent } from './side-nav.component';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('SideNavComponent', () => {
  let component: SideNavComponent;
  let fixture: ComponentFixture<SideNavComponent>;
  const getReportButton = () =>
    fixture.debugElement.queryAll(By.css('button'))[0];
  const getLogoutButton = () =>
    fixture.debugElement.queryAll(By.css('button'))[1];
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SideNavComponent],
      imports: [
        FlexLayoutModule,
        MatListModule,
        RouterTestingModule,
        MatIconModule,
        MatButtonModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('dispatches report action on clicking report button', () => {
    const spy = spyOn(component.report, 'emit');
    const reportButton = getReportButton().nativeElement;
    reportButton.dispatchEvent(new MouseEvent('click'));
    expect(spy).toHaveBeenCalled();
  });
  it('dispatches logout action on clicking logout button', () => {
    const spy = spyOn(component.logout, 'emit');
    const logoutButton = getLogoutButton().nativeElement;
    logoutButton.dispatchEvent(new MouseEvent('click'));
    expect(spy).toHaveBeenCalled();
  });
});
