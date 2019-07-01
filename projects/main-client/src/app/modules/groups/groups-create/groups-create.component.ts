import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild
} from '@angular/core';
import { Group } from '../../../models/group';
import { User } from '../../../models/user';
import { NgForm } from '@angular/forms';
import { logger } from '../../../core/logger';
import { GroupFacadeService } from '../../../app-store/group/group.facade';
import { Location } from '@angular/common';

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
            [(ngModel)]="deck.description"
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
                  class="upper-right hover-hide-el"
                  mat-icon-button
                  type="button"
                  aria-label="Remove User"
                  title="Remove User"
                >
                  <mat-icon>close</mat-icon>
                </button>
                <mat-card-content
                  fxLayout="row"
                  fxLayoutAlign="center center"
                  fxLayoutGap="4px"
                >
                  <!-- TODO: add user search here -->
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
  public users: Array<Partial<User>> = [];
  @ViewChild('form', { static: true }) form: NgForm;
  constructor(
    private groupFacade: GroupFacadeService,
    private location: Location
  ) {}

  ngOnInit() {}

  public trackUserBy(index: number) {
    return index;
  }
  public addUser() {
    this.users = [...this.users, {}];
  }
  public removeUser(user: Partial<User>) {
    this.users = this.users.filter(existingUser => user !== user);
  }
  public back() {
    this.location.back();
  }
  public onSubmit(form: NgForm) {
    if (form.valid) {
      logger.log('form valid', { form });
      this.groupFacade.createGroupWithUsers({
        group: this.group,
        users: this.users
      });
    }
  }
}
