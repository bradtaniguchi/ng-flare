import { TestBed } from '@angular/core/testing';

import { GroupService } from './group.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Group } from '../../../models/group';
import { from } from 'rxjs';

describe('GroupService', () => {
  const data = [[] as Group[]];
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
    const service: GroupService = TestBed.get(GroupService);
    expect(service).toBeTruthy();
  });
});
