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
import { Card } from '../../../models/card';

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
        <!-- card entry -->
        <ul ngModelGroup="cards" fxLayout="column" fxLayoutGap="4px">
          <ng-container
            *ngFor="let card of cards; let index = index; trackBy: trackCardBy"
            [ngModelGroup]="index"
          >
            <li fxFlex>
              <mat-card class="flat hover-hide">
                <button
                  style="position: absolute; right: 4px; top: 4px; z-index: 2"
                  class="hover-hide-el"
                  mat-icon-button
                  type="button"
                  (click)="removeCard(card)"
                  aria-label="Remove Card"
                  title="Remove Card"
                >
                  <mat-icon>close</mat-icon>
                </button>
                <mat-card-content
                  fxLayout="row"
                  fxLayoutAlign="center center"
                  fxLayoutGap="4px"
                >
                  <mat-form-field fxFlex>
                    <mat-label>Front</mat-label>
                    <textarea
                      matInput
                      type="text"
                      name="front"
                      #front="ngModel"
                      [(ngModel)]="cards[index].front"
                    ></textarea>
                  </mat-form-field>
                  <mat-form-field fxFlex>
                    <mat-label>Back</mat-label>
                    <textarea
                      matInput
                      type="text"
                      name="back"
                      #description="ngModel"
                      [(ngModel)]="cards[index].back"
                    ></textarea>
                  </mat-form-field>
                </mat-card-content>
              </mat-card>
            </li>
          </ng-container>
          <div>
            <button mat-button type="button" (click)="addCard()">
              Add Card
            </button>
          </div>
        </ul>

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
  public cards: Array<Partial<Card>> = [{}];

  @ViewChild('form') form: NgForm;
  constructor(
    private deckFacade: DeckFacadeService,
    private location: Location
  ) {}

  ngOnInit() {}

  public trackCardBy(index: number) {
    return index;
  }

  public addCard() {
    this.cards = [...this.cards, {}];
  }

  public removeCard(card: Partial<Card>) {
    this.cards = this.cards.filter(existingCard => existingCard !== card);
  }

  public back() {
    this.location.back();
  }

  public onSubmit(form: NgForm) {
    if (form.valid) {
      this.deckFacade.createDeck(this.deck);
      // TODO: create cards
    }
  }
}
