import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import {
  MatIconModule,
  MatToolbarModule,
  MatProgressBarModule
} from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { FlexLayoutModule } from '@angular/flex-layout';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [
        FlexLayoutModule,
        MatIconModule,
        MatToolbarModule,
        RouterTestingModule,
        MatProgressBarModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('shows progress bar if loading is true');
  xit('does not show progress bar if loading is false');
  xit('shows group name if given');
  xit('does not show group name if not given');
  xit('emits toggle menu on menu click');
});
