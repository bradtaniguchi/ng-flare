import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Deck } from '../../../models/deck';

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
            #name="ngModel"
            [(ngModel)]="deck.name"
          />
        </mat-form-field>
        <mat-form-field>
          <mat-label>Description</mat-label>
          <textarea
            matInput
            type="text"
            name="description"
            #description="ngModel"
            [(ngModel)]="deck.description"
          >
          </textarea>
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
  constructor() {}

  ngOnInit() {}

  onSubmit(form: any) {
    console.log('test with form: ', form);
  }
}
