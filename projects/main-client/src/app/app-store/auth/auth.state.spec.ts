import { AuthReducer, AuthState } from './auth.state';
import {
  AuthActions,
  AuthStateChange,
  SetAuthCred,
  AuthLogout,
  AuthRegisterSuccess,
  AuthRegisterOnlyUpdateSuccess
} from './auth.actions';
import { User } from '../../models/user';

describe('AuthReducer', () => {
  const testAuthReducer = (testCase: {
    state: Partial<AuthState>;
    action: AuthActions;
    expected: Partial<AuthState>;
  }) =>
    expect(AuthReducer(testCase.state, testCase.action)).toEqual(
      testCase.expected
    );
  const user: User = {
    displayName: 'displayName',
    email: 'email'
  } as any;
  it('null action', () =>
    testAuthReducer({
      state: {
        user: {} as any
      },
      action: { type: 'NULL' } as any,
      expected: {
        user: {} as any
      }
    }));
  it('state change adds user', () =>
    testAuthReducer({
      state: {},
      action: new AuthStateChange({
        user
      }),
      expected: {
        user
      }
    }));
  it('state updates existing user', () =>
    testAuthReducer({
      state: {
        user: {
          displayName: 'olderName',
          email: 'olderEmail',
          uid: 'oldUID'
        } as any
      },
      action: new AuthStateChange({
        user
      }),
      expected: {
        user
      }
    }));
  it('SetAuthCred adds cred', () =>
    testAuthReducer({
      state: {},
      action: new SetAuthCred({
        credentials: {} as any
      }),
      expected: {
        credentials: {} as any
      }
    }));
  it('logout removes existing state', () =>
    testAuthReducer({
      state: {
        user
      },
      action: new AuthLogout(),
      expected: {}
    }));
  it('RegisterSuccess sets newRegister to true', () =>
    testAuthReducer({
      state: {},
      action: new AuthRegisterSuccess(),
      expected: {
        newRegister: true
      }
    }));
  it('OnlyUpdateSuccess sets newRegister to false', () =>
    testAuthReducer({
      state: {},
      action: new AuthRegisterOnlyUpdateSuccess(),
      expected: {
        newRegister: false
      }
    }));
});
