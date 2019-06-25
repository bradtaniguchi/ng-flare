import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupsListComponent } from './groups-list.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoadingSpinnerModule } from '../../../shared/loading-spinner/loading-spinner.module';
import {
  MatIconModule,
  MatCardModule,
  MatButtonModule
} from '@angular/material';
import { CreateFabModule } from '../../../shared/create-fab/create-fab.module';

describe('GroupsListComponent', () => {
  let component: GroupsListComponent;
  let fixture: ComponentFixture<GroupsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GroupsListComponent],
      imports: [
        FlexLayoutModule,
        LoadingSpinnerModule,
        CreateFabModule,
        MatIconModule,
        MatCardModule,
        MatButtonModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
