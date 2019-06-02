import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import {
  MatIconModule,
  MatToolbarModule,
  MatProgressBarModule,
  MatButtonModule
} from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  const getProgressBar = () =>
    fixture.debugElement.query(By.css('mat-progress-bar'));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [
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
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows progress bar if loading is true', async () => {
    // await fixture.whenStable();
    component.loading = true;
    fixture.detectChanges();
    const progressBar = getProgressBar();
    console.log('test', { component, fixture, progressBar });
    expect(progressBar).toBeTruthy();
  });
  it('does not show progress bar if loading is false');
  it('shows group name if given');
  it('does not show group name if not given');
  it('emits toggle menu on menu click');
});
