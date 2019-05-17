import { TestBed } from '@angular/core/testing';

import { CardService } from './card.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { from } from 'rxjs';
import { Card } from '../../../models/card';

describe('CardService', () => {
  const data = [[] as Card[]];
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
    const service: CardService = TestBed.get(CardService);
    expect(service).toBeTruthy();
  });
});
