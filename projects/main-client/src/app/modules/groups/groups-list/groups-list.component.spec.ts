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
import { RouterTestingModule } from '@angular/router/testing';

import { provideMockStore } from '@ngrx/store/testing';

describe('GroupsListComponent', () => {
  let component: GroupsListComponent;
  let fixture: ComponentFixture<GroupsListComponent>;
  const initialState = {
    group: {
      entities: {}
    }
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GroupsListComponent],
      providers: [provideMockStore({ initialState })],
      imports: [
        FlexLayoutModule,
        LoadingSpinnerModule,
        RouterTestingModule,
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
