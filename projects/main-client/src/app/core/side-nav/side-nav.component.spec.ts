import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatListModule, MatIconModule } from '@angular/material';
import { SideNavComponent } from './side-nav.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('SideNavComponent', () => {
  let component: SideNavComponent;
  let fixture: ComponentFixture<SideNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SideNavComponent],
      imports: [
        FlexLayoutModule,
        MatListModule,
        RouterTestingModule,
        MatIconModule
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
});
