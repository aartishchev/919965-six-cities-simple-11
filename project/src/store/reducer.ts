import { createReducer } from '@reduxjs/toolkit';
import { UserData } from '../types/user-data';
import { Offer } from '../types/offer';
import {
  setCity,
  setSorting,
  setAuthorizationStatus,
  setOffersLoadingStatus,
  setOffers,
  setUserData
} from './actions';
import {
  AuthorizationStatus,
  Cities,
  DEFAULT_CITY,
  DEFAULT_SORTING,
  SortingOptions,
} from '../const';

type InitialState = {
  offers: Offer[];
  selectedCity: typeof Cities[number];
  selectedSorting: typeof SortingOptions[number];
  authorizationStatus: AuthorizationStatus;
  areOffersLoading: boolean;
  error: string | null;
  userData: UserData;
};

const initialState: InitialState = {
  offers: [],
  selectedCity: DEFAULT_CITY,
  selectedSorting: DEFAULT_SORTING,
  authorizationStatus: AuthorizationStatus.Unknown,
  areOffersLoading: false,
  error: null,
  userData: {
    avatarUrl: '',
    email: '',
    id: 1,
    isPro: false,
    name: '',
    token: ''
  },
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
    .addCase(setAuthorizationStatus, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUserData, (state, action) => {
      state.userData = action.payload;
    });
});

export { reducer };
