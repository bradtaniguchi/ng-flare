import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupsCreateComponent } from './groups-create.component';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

describe('GroupsCreateComponent', () => {
  let component: GroupsCreateComponent;
  let fixture: ComponentFixture<GroupsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GroupsCreateComponent],
      imports: [
        FormsModule,
        // angular material
        FlexLayoutModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
