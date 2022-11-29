import { createReducer } from '@reduxjs/toolkit';
import { UserData } from '../types/user-data';
import { Offer } from '../types/offer';
import { ReviewIncoming } from '../types/review';
import {
  setCity,
  setSorting,
  setAuthorizationStatus,
  setDataLoadingStatus,
  setOffers,
  setUserData,
  setTargetOffer,
  setNearbyOffers,
  setReviewsIncoming
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
  isDataLoading: boolean;
  userData: UserData | null;
  targetOffer: Offer | null;
  nearbyOffers: Offer[];
  reviewsIncoming: ReviewIncoming[];
};

const initialState: InitialState = {
  offers: [],
  selectedCity: DEFAULT_CITY,
  selectedSorting: DEFAULT_SORTING,
  authorizationStatus: AuthorizationStatus.Unknown,
  isDataLoading: false,
  userData: null,
  targetOffer: null,
  nearbyOffers: [],
  reviewsIncoming: [],
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
    .addCase(setDataLoadingStatus, (state, action) => {
      state.isDataLoading = action.payload;
    })
    .addCase(setAuthorizationStatus, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUserData, (state, action) => {
      state.userData = action.payload;
    })
    .addCase(setTargetOffer, (state, action) => {
      state.targetOffer = action.payload;
    })
    .addCase(setNearbyOffers, (state, action) => {
      state.nearbyOffers = action.payload;
    })
    .addCase(setReviewsIncoming, (state, action) => {
      state.reviewsIncoming = action.payload;
    });
});

export { reducer };
