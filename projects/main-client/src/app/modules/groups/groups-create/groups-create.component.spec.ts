import {
  async,
  ComponentFixture,
  TestBed,
  flush,
  fakeAsync,
  tick
} from '@angular/core/testing';

import { GroupsCreateComponent } from './groups-create.component';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { GroupFacadeService } from '../../../app-store/group/group.facade';
import { provideMockStore } from '@ngrx/store/testing';
import { AppState } from '../../../app-store/app-state';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { AuthFacadeService } from '../../../app-store/auth/auth-facade.service';
import { MatSelectModule } from '@angular/material/select';
import { Directive } from '@angular/core';

@Directive({
  exportAs: 'appValidUserId',
  selector: '[appValidUserId]'
})
class FakeValidUserIdDirective {}
describe('GroupsCreateComponent', () => {
  let component: GroupsCreateComponent;
  let fixture: ComponentFixture<GroupsCreateComponent>;
  const initialState: Partial<AppState> = {
    auth: {
      user: {
        uid: 'userId',
        displayName: 'brad'
      } as any
    }
  };

  const getNameInput = () =>
    fixture.debugElement.query(By.css('input[name="name"]'));
  const getErrors = () => fixture.debugElement.queryAll(By.css('mat-error'));
  const getDescriptionInput = () =>
    fixture.debugElement.query(By.css('textarea[name="description"'));
  const getSubmit = () =>
    fixture.debugElement.query(By.css('button[type="submit"]'));

  const getUserUid = () =>
    fixture.debugElement.queryAll(By.css('input[name="uid"]'));
  const getUserRoleType = () =>
    fixture.debugElement.queryAll(By.css('.mat-select-trigger'));
  const getOptions = () => fixture.debugElement.queryAll(By.css('mat-option'));
  const getUserRemoveButton = () =>
    fixture.debugElement.queryAll(By.css('button[mat-icon-button]'));
  const getAddUserButton = () =>
    fixture.debugElement.query(By.css('button[mat-button]'));

  const addUser = () => {
    const addUserButton = getAddUserButton().nativeElement;
    addUserButton.dispatchEvent(new MouseEvent('click'));
    fixture.detectChanges();
  };

  const removeUser = (index: number) => {
    console.log('removed users', getUserRemoveButton());
    const userRemoveButton = getUserRemoveButton()[index].nativeElement;
    userRemoveButton.dispatchEvent(new MouseEvent('click'));
    fixture.detectChanges();
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GroupsCreateComponent, FakeValidUserIdDirective],
      imports: [
        FormsModule,
        RouterTestingModule,
        NoopAnimationsModule,
        // angular material
        FlexLayoutModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatSelectModule
      ],
      providers: [
        GroupFacadeService,
        AuthFacadeService,
        provideMockStore({ initialState })
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
  it('input exists', () => {
    const nameInput = getNameInput().nativeElement;
    expect(nameInput).toBeTruthy();
  });
  it('description exists', () => {
    const descriptionInput = getDescriptionInput().nativeElement;
    expect(descriptionInput).toBeTruthy();
  });
  it('submit exists', () => {
    const submitButton = getSubmit().nativeElement;
    expect(submitButton).toBeTruthy();
  });
  it('add user exists', () => {
    const addUserButton = getAddUserButton().nativeElement;
    expect(addUserButton).toBeTruthy();
  });
  it('remove user does not exist initially', () => {
    const userRemoveButton = getUserRemoveButton()[0];
    expect(userRemoveButton).toBeFalsy();
  });
  it('form should start with showing current user as readonly', () => {
    const userCodeInput = getUserUid()[0].nativeElement;
    expect(userCodeInput.readOnly).toBeTruthy();
  });
  it('should not be able to remove initial user', () => {
    const userRemoveButton = getUserRemoveButton()[0];
    expect(userRemoveButton).toBeFalsy();
  });
  // todo need async validator
  it('adds new user inputs when clicking on create', () => {
    addUser();
    addUser();
    addUser();
    const userCodeInputs = getUserUid();
    expect(userCodeInputs.length).toEqual(4);
  });
  it('removes user input when clicking on remove', async () => {
    await fixture.whenStable();
    addUser();
    fixture.detectChanges();
    removeUser(0);
    fixture.detectChanges();

    const userCodeInputs = getUserUid();
    expect(userCodeInputs.length).toEqual(1);
  });
  it('should be able to add new user via user code', async () => {
    await fixture.whenStable();
    addUser();
    fixture.detectChanges();
    await fixture.whenStable();

    const userCodeInput = getUserUid()[1].nativeElement;
    userCodeInput.value = 'testUserId';
    userCodeInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.form.value.users).toEqual({
      0: { roleType: 'Admin' },
      1: { uid: 'testUserId', roleType: 'Admin' }
    });
  });
  it('can change user permissions', async () => {
    await fixture.whenStable();
    // not sure why the value of the form never updates
    addUser();
    const userPermission = getUserRoleType()[1].nativeElement;
    userPermission.dispatchEvent(new MouseEvent('click'));
    fixture.detectChanges();
    await fixture.whenStable();
    // select the editor role
    const editorOption = getOptions()[1].nativeElement;
    console.log('option', editorOption);
    editorOption.dispatchEvent(new MouseEvent('click'));
    // required to wait for form updates to be applied
    fixture.detectChanges();
    await fixture.whenStable();

    console.log('test form value', component.form);
    expect(component.form.value.users).toEqual({
      0: { roleType: 'Admin' },
      1: { uid: undefined, roleType: 'Editor' }
    });
  });
  it('form should be invalid initially', async () => {
    const submit = getSubmit().nativeElement;
    submit.dispatchEvent(new MouseEvent('click'));
    fixture.detectChanges();
    await fixture.whenStable();
    expect(component.form.valid).toEqual(false);
  });
  it('form is valid after filling just name', async () => {
    await fixture.whenStable();
    const nameInput = getNameInput().nativeElement;
    console.log('name input', nameInput);
    nameInput.value = 'some group name';
    nameInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const submit = getSubmit().nativeElement;
    submit.dispatchEvent(new MouseEvent('click'));
    fixture.detectChanges();

    await fixture.whenStable();
    console.log('errors', component.form);
    expect(component.form.valid).toEqual(true);
  });
  it('form shows required if create is clicked', async () => {
    await fixture.whenStable();
    const submit = getSubmit().nativeElement;
    submit.dispatchEvent(new MouseEvent('click'));
    fixture.detectChanges();

    const error = getErrors()[0].nativeElement;
    expect(error.innerText).toEqual('Field is Required');
  });
  // these aren't needed right now
  // it('form is invalid if user just fills out description');
  // it('dispatches action to create group with name, description and users');
  // it('does not dispatch action if create group if no name');
});
