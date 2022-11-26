import { createReducer } from '@reduxjs/toolkit';
import {
  setCity,
  setSorting,
  requireAuthorization,
  setOffersLoadingStatus,
  setOffers,
} from './actions';
import {
  AuthorizationStatus,
  Cities,
  DEFAULT_CITY,
  DEFAULT_SORTING,
  SortingOptions,
} from '../const';
import { Offer } from '../types/offer';

type InitialState = {
  offers: Offer[];
  selectedCity: typeof Cities[number];
  selectedSorting: typeof SortingOptions[number];
  authorizationStatus: AuthorizationStatus;
  areOffersLoading: boolean;
  error: string | null;
};

const initialState: InitialState = {
  offers: [],
  selectedCity: DEFAULT_CITY,
  selectedSorting: DEFAULT_SORTING,
  authorizationStatus: AuthorizationStatus.Unknown,
  areOffersLoading: false,
  error: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setCity, (state, action) => {
      const { targetCity } = action.payload;
      state.selectedCity = targetCity;
    })
    .addCase(setSorting, (state, action) => {
      const { targetSorting } = action.payload;
      state.selectedSorting = targetSorting;
    })
    .addCase(setOffersLoadingStatus, (state, action) => {
      state.areOffersLoading = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    });
});

export { reducer };
