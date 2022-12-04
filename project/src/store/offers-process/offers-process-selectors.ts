import { NameSpace } from '../../const';
import { OffersProcess, State } from '../../types/state';

export const getSelectedCity = (state: State): OffersProcess['selectedCity'] =>
  state[NameSpace.Offer].selectedCity;
export const getSelectedSorting = (state: State): OffersProcess['selectedSorting'] =>
  state[NameSpace.Offer].selectedSorting;
