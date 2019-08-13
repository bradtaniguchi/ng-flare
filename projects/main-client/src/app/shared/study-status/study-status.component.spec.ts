import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyStatusComponent } from './study-status.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { StudyService } from '../../core/services/study/study.service';

describe('StudyStatusComponent', () => {
  let component: StudyStatusComponent;
  let fixture: ComponentFixture<StudyStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StudyStatusComponent],
      imports: [FlexLayoutModule, MatProgressBarModule],
      providers: [StudyService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
