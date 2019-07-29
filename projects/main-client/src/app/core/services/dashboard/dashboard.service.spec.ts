import { TestBed } from '@angular/core/testing';

import { DashboardService } from './dashboard.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { from } from 'rxjs';

describe('DashboardService', () => {
  const angularFirestoreStub = {};
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
    const service: DashboardService = TestBed.get(DashboardService);
    expect(service).toBeTruthy();
  });
});
