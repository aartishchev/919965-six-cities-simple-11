import { NameSpace } from '../../const';
import { State, UserProcess } from '../../types/state';

export const getAuthorizationStatus = (state: State): UserProcess['authorizationStatus'] =>
  state[NameSpace.User].authorizationStatus;
export const getUserData = (state: State): UserProcess['userData'] =>
  state[NameSpace.User].userData;
