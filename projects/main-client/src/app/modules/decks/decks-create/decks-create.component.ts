import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Deck } from '../../../models/deck';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app-store/app-state';

@Component({
  selector: 'app-decks-create',
  template: `
    <div class="margin">
      <form
        novalidate
        (submit)="onSubmit(form)"
        #form="ngForm"
        fxLayout="column"
      >
        <mat-form-field>
          <mat-label>Deck Name</mat-label>
          <input
            matInput
            type="text"
            name="name"
            required
            maxlength="32"
            #name="ngModel"
            [(ngModel)]="deck.name"
          />
          <mat-error *ngIf="name.errors.required">
            Field is Required
          </matInput>
          <mat-error *ngIf="name.errors.maxlength">
            Name is too long
          </matInput>
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
          <mat-error *ngIf="name.errors.maxlength">
            Description is too long
          </matInput>
        </mat-form-field>
        <div fxLayout="row" fxLayoutAlign="end center">
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
export class DecksCreateComponent implements OnInit {
  public deck: Partial<Deck> = {};
  constructor(private store: Store<AppState>) {}

  ngOnInit() {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log('test with form: ', form);
    }
  }
}
