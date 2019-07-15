import { TestBed, tick, fakeAsync, flush } from '@angular/core/testing';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { of, Subject, BehaviorSubject } from 'rxjs';
import { UserService } from '../../core/services/user/user.service';
import { ValidUserIdDirective } from './valid-user-id.directive';
import { ChangeDetectorRef } from '@angular/core';

describe('ValidUserIdDirective', () => {
  let directive: ValidUserIdDirective;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ValidUserIdDirective],
      providers: [
        ValidUserIdDirective,
        {
          provide: UserService,
          useValue: {
            // TODO: handle more cleanly
            get: (key: string) => (key === 'realId' ? of({}) : of(undefined))
          }
        },
        {
          provide: ChangeDetectorRef,
          useValue: {
            markForCheck: () => {}
          }
        }
      ]
    });
    directive = TestBed.get(ValidUserIdDirective);
  });
  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });
  // TODO
  // skip until tests are updated correctly
  xdescribe('validate', () => {
    const testValidate = (testCase: {
      control: AbstractControl;
      expected: ValidationErrors | null;
    }) => {
      directive.validate(testCase.control).subscribe(val => {
        expect(val).toEqual(testCase.expected);
      });
    };
    it('returns error', done => {
      const valueChanges = new BehaviorSubject<string>('');
      const control: any = {
        valueChanges
      };
      valueChanges.next('noId');
      // testValidate({
      //   control,
      //   expected: {
      //     uid: true
      //   }
      // });
    });
    xit('returns null', fakeAsync(() => {
      const valueChanges = new BehaviorSubject<string>('');
      const control: any = {
        valueChanges
      };
      valueChanges.next('realId');
      testValidate({
        control,
        expected: null
      });
    }));
  });
});
