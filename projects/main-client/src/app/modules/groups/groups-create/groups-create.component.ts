import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild
} from '@angular/core';
import { Group } from '../../../models/group';
import { User, UserFormItem } from '../../../models/user';
import { NgForm } from '@angular/forms';
import { logger } from '../../../core/logger';
import { GroupFacadeService } from '../../../app-store/group/group.facade';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../app-store/app-state';
import { AuthFacadeService } from '../../../app-store/auth/auth-facade.service';
import { Permission } from '../../../models/permission';
import { map, take, tap } from 'rxjs/operators';
import { RoleType, ROLES } from '../../../models/role';
import { Router } from '@angular/router';

@Component({
  selector: 'app-groups-create',
  template: `
    <div class="margin">
      <form
        novalidate
        (submit)="onSubmit(form)"
        #form="ngForm"
        fxLayout="column"
      >
        <mat-form-field>
          <mat-label>
            Group Name
          </mat-label>
          <input
            matInput
            type="text"
            name="name"
            required
            maxlength="32"
            #name="ngModel"
            autocomplete="off"
            [(ngModel)]="group.name"
          />
          <mat-error *ngIf="name.errors?.required">
            Field is Required
          </mat-error>
          <mat-error *ngIf="name.errors?.maxlength">
            Name is too long
          </mat-error>
        </mat-form-field>
        <mat-form-field>
          <mat-label>Description</mat-label>
          <textarea
            matInput
            type="text"
            name="description"
            maxlength="256"
            #description="ngModel"
            [(ngModel)]="group.description"
          >
          </textarea>
          <mat-error *ngIf="name.errors?.maxlength">
            Description is too long
          </mat-error>
        </mat-form-field>
        <!-- user form -->
        <ul ngModelGroup="users" fxLayout="column" fxLayoutGap="4px">
          <ng-container
            *ngFor="let user of users; let index = index; trackBy: trackUserBy"
            [ngModelGroup]="index"
          >
            <li fxFlex>
              <mat-card class="flat hover-hide">
                <button
                  *ngIf="index !== 0"
                  class="upper-right hover-hide-el"
                  mat-icon-button
                  type="button"
                  aria-label="Remove User"
                  title="Remove User"
                  (click)="removeUser(user)"
                >
                  <mat-icon>close</mat-icon>
                </button>
                <mat-card-content
                  fxLayout="row"
                  fxLayoutAlign="center center"
                  fxLayoutGap="4px"
                >
                  <!-- TODO: add user search here -->
                  <mat-form-field fxFlex>
                    <mat-label>User Code</mat-label>
                    <img
                      matPrefix
                      *ngIf="validUserId.user$ | async as user"
                      [src]="user.photoURL"
                      [title]="user.displayName"
                      class="user-avatar"
                      style="margin-right: 8px"
                    />
                    <input
                      type="text"
                      autocomplete="off"
                      matInput
                      name="uid"
                      #uid="ngModel"
                      appValidUserId
                      #validUserId="appValidUserId"
                      [disabled]="
                        (currentUser$ | async)?.uid === users[index].uid
                      "
                      [readonly]="
                        (currentUser$ | async)?.uid === users[index].uid
                      "
                      [(ngModel)]="users[index].uid"
                      [title]="validUserId.user$ | async | json"
                    />
                    <!-- todo: add userId async validator directive -->
                    <mat-hint>
                      The user code is available from the user profile
                    </mat-hint>
                    <mat-error *ngIf="uid.errors?.uid">
                      User not found
                    </mat-error>
                  </mat-form-field>
                  <mat-form-field fxFlex>
                    <mat-icon matPrefix>lock</mat-icon>
                    <mat-label>Role Permission</mat-label>
                    <mat-select
                      matInput
                      name="roleType"
                      #roleType="ngModel"
                      required
                      [(ngModel)]="users[index].roleType"
                    >
                      <mat-option
                        *ngFor="let role of roles"
                        [value]="role.type"
                      >
                        {{ role.type }}
                      </mat-option>
                    </mat-select>
                    <mat-hint>
                      Click <a>here</a> to more information on each permission
                      level
                    </mat-hint>
                  </mat-form-field>
                </mat-card-content>
              </mat-card>
            </li>
          </ng-container>
        </ul>
        <div>
          <button mat-button type="button" (click)="addUser()">
            Add User
          </button>
        </div>
        <!-- actions -->

        <div fxLayout="row" fxLayoutAlign="end center">
          <a mat-button routerLink="../">
            Cancel
          </a>
          <button mat-button type="submit" color="primary">
            Create
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupsCreateComponent implements OnInit {
  public group: Partial<Group> = {};
  public users: Array<Partial<UserFormItem>>;
  public roleTypes: RoleType[] = Object.values(RoleType);
  public currentUser$: Observable<User>;
  public roles = ROLES;
  @ViewChild('form', { static: true }) form: NgForm;
  constructor(
    private store: Store<AppState>,
    private authFacade: AuthFacadeService,
    private groupFacade: GroupFacadeService,
    private location: Location
  ) {}

  ngOnInit() {
    this.currentUser$ = this.observeCurrentUser();
    this.populateUsers(this.currentUser$)
      .pipe(take(1))
      .subscribe(users => (this.users = users));
  }

  private observeCurrentUser() {
    return this.store.pipe(select(this.authFacade.getUserState));
  }
  private populateUsers(
    currentUser: Observable<User>
  ): Observable<Array<Partial<UserFormItem>>> {
    return currentUser.pipe(
      map(
        user =>
          [{ uid: user.uid, roleType: RoleType.Admin }] as Array<
            Partial<UserFormItem>
          >
      )
    );
  }
  public trackUserBy(index: number) {
    return index;
  }
  public addUser() {
    this.users = [
      ...this.users,
      {
        uid: undefined,
        roleType: RoleType.Admin
      }
    ];
  }
  public removeUser(user: Partial<UserFormItem>) {
    this.users = this.users.filter(existingUser => existingUser !== user);
  }
  public back() {
    this.location.back();
  }
  public onSubmit(form: NgForm) {
    logger.log('form valid', { form });
    if (form.valid) {
      this.groupFacade.createGroupWithUsers({
        group: this.group,
        users: this.users
      });
    }
  }
}
