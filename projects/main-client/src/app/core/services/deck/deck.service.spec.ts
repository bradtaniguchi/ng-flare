import { TestBed } from '@angular/core/testing';

import { DeckService } from './deck.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { from } from 'rxjs';
import { Deck } from '../../../models/deck';

describe('DeckService', () => {
  const data = [[] as Deck[]];
  const angularFirestoreStub = {
    collection: jasmine.createSpy('collection').and.returnValue(from(data))
  };
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        {
          provide: AngularFirestore,
          useValue: angularFirestoreStub
        }
      ]
    })
  );

  it('should be created', () => {
    const service: DeckService = TestBed.get(DeckService);
    expect(service).toBeTruthy();
  });
});
