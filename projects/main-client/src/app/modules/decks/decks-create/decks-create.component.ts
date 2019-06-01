import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { DeckFacadeService } from '../../../app-store/deck/deck-facade.service';
import { Deck } from '../../../models/deck';
import { Location } from '@angular/common';

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
            autocomplete="off"
            [(ngModel)]="deck.name"
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
        <div fxLayout="row" fxLayoutAlign="end center">
          <a mat-button (click)="back()">
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
export class DecksCreateComponent implements OnInit {
  public deck: Partial<Deck> = {};

  @ViewChild('form') form: NgForm;
  constructor(
    private deckFacade: DeckFacadeService,
    private location: Location
  ) {}

  ngOnInit() {}

  back() {
    this.location.back();
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.deckFacade.createDeck(form.value);
    }
  }
}
