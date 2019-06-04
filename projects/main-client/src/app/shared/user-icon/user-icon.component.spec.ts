import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserIconComponent } from './user-icon.component';
import { By } from '@angular/platform-browser';

describe('UserIconComponent', () => {
  let component: UserIconComponent;
  let fixture: ComponentFixture<UserIconComponent>;

  const getImgTag = () => fixture.debugElement.query(By.css('img'));
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserIconComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserIconComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('img does not show if no user', () => {
    component.user = undefined;
    fixture.detectChanges();
    const imgTag = getImgTag();
    expect(imgTag).toBeFalsy();
  });
  it('img shows if user is provided', () => {
    component.user = {
      photoURL: 'hi',
      displayName: 'display name'
    } as any;
    fixture.detectChanges();
    console.log();
    const imgTag = getImgTag();
    expect(imgTag).toBeTruthy();
  });
});
