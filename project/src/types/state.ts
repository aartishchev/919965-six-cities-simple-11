import { store } from '../store/index.js';
import { AuthorizationStatus, Cities, SortingOptions } from '../const.js';
import { Offer } from './offer.js';
import { ReviewIncoming } from './review.js';
import { UserData } from './user-data.js';

export type OffersProcess = {
  selectedCity: typeof Cities[number];
  selectedSorting: typeof SortingOptions[number];
}

export type OffersData = {
  offers: Offer[];
  targetOffer: Offer | null;
  nearbyOffers: Offer[];
  reviewsIncoming: ReviewIncoming[];
  isDataLoading: boolean;
  isError: boolean;
};

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  userData: UserData | null;
};

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
