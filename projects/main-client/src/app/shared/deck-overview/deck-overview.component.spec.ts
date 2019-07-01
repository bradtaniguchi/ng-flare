import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { DeckOverviewComponent } from './deck-overview.component';

describe('DeckOverviewComponent', () => {
  let component: DeckOverviewComponent;
  let fixture: ComponentFixture<DeckOverviewComponent>;
  const getEditButton = () =>
    fixture.debugElement
      .queryAll(By.css('a'))
      .find(
        element =>
          element && element.nativeElement.textContent.trim() === 'Edit'
      );
  const getStudyButton = () =>
    fixture.debugElement
      .queryAll(By.css('a'))
      .find(
        element =>
          element && element.nativeElement.textContent.trim() === 'Study'
      );
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DeckOverviewComponent],
      imports: [
        RouterTestingModule,
        FlexLayoutModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeckOverviewComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('hides edit if canEdit is not passed', () => {
    component.deck = {} as any;
    const editButton = getEditButton();
    fixture.detectChanges();
    expect(editButton).toBeFalsy();
  });
  it('shows edit if canEdit is passed as true', () => {
    component.deck = {} as any;
    component.canEdit = true;
    fixture.detectChanges();
    const editButton = getEditButton();
    expect(editButton).toBeTruthy();
  });
  it('shows study button', () => {
    const studyButton = getStudyButton();
    expect(studyButton).toBeTruthy();
  });
});
