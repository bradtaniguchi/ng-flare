import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { User } from '../../../models/user';
import { AngularFirestore } from '@angular/fire/firestore';
import { from } from 'rxjs';

describe('UserService', () => {
  const data = [[] as User[]];
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
    const service: UserService = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });
});
