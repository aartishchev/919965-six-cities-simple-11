import { userProcess } from './user-process';
import { UserProcess } from '../../types/state';
import { AuthorizationStatus } from '../../const';
import { checkAuthAction, loginAction, logoutAction } from '../api-actions';
import { makeFakeUserData } from '../../utils/mocks';

const userData = makeFakeUserData();

describe('Reducer: userProcess', () => {
  let initialState: UserProcess;

  beforeEach(() => {
    initialState = {
      authorizationStatus: AuthorizationStatus.Unknown,
      userData: null,
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(userProcess.reducer(undefined, { type: 'UNKNOWN_ACTION' })).toEqual(initialState);
  });

  describe('checkAuthAction test', () => {
    it('should update authorizationStatus to "AUTH" and set userData if checkAuthAction fulfilled', () => {
      expect(
        userProcess.reducer(initialState, {
          type: checkAuthAction.fulfilled.type,
          payload: userData,
        })
      ).toEqual({ authorizationStatus: AuthorizationStatus.Auth, userData });
    });

    it('should update authorizationStatus to "NO_AUTH" if checkAuthAction rejected', () => {
      expect(
        userProcess.reducer(initialState, { type: checkAuthAction.rejected.type, userData: null })
      ).toEqual({
        authorizationStatus: AuthorizationStatus.NoAuth,
        userData: null,
      });
    });
  });

  describe('loginAction test', () => {
    it('should update authorizationStatus to "AUTH" and set userData if loginAction fulfilled', () => {
      expect(
        userProcess.reducer(initialState, { type: loginAction.fulfilled.type, payload: userData })
      ).toEqual({ authorizationStatus: AuthorizationStatus.Auth, userData });
    });

    it('should update authorizationStatus to "NO_AUTH" if loginAction rejected', () => {
      expect(
        userProcess.reducer(initialState, { type: loginAction.rejected.type })
      ).toEqual({ authorizationStatus: AuthorizationStatus.NoAuth, userData: null });
    });
  });

  describe('logoutAction test', () => {
    it('should update authorizationStatus to "NO_AUTH" if logoutAction fulfilled', () => {
      expect(
        userProcess.reducer(initialState, { type: logoutAction.fulfilled.type })
      ).toEqual({ authorizationStatus: AuthorizationStatus.NoAuth, userData: null });
    });
  });
});
