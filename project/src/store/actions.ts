import { createAction } from '@reduxjs/toolkit';
import { AuthorizationStatus, AppRoute, Cities, SortingOptions } from '../const';
import { Offer } from '../types/offer';
import { ReviewIncoming } from '../types/review';
import { UserData } from '../types/user-data';

export const setCity = createAction<{targetCity: typeof Cities[number]}>('offer/setCity');
export const setSorting = createAction<{targetSorting: typeof SortingOptions[number]}>('offer/setSorting');
export const setUserData = createAction<UserData>('user/setUserData');
export const setAuthorizationStatus = createAction<AuthorizationStatus>('user/setAuthorizationStatus');
export const setDataLoadingStatus = createAction<boolean>('data/setDataLoadingStatus');
export const setOffers = createAction<Offer[]>('data/setOffers');
export const setTargetOffer = createAction<Offer>('data/setTargetOffer');
export const setNearbyOffers = createAction<Offer[]>('data/setNearbyOffers');
export const setReviewsIncoming = createAction<ReviewIncoming[]>('data/setReviewsIncoming');
export const redirectToRoute = createAction<AppRoute>('offer/redirectToRoute');
