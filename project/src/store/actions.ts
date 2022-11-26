import { createAction } from '@reduxjs/toolkit';
import { AuthorizationStatus, AppRoute, Cities, SortingOptions } from '../const';
import { Offer } from '../types/offer';
import { UserData } from '../types/user-data';

export const setCity = createAction<{targetCity: typeof Cities[number]}>('offer/setCity');
export const setSorting = createAction<{targetSorting: typeof SortingOptions[number]}>('offer/setSorting');
export const setOffers = createAction<Offer[]>('data/setOffers');
export const setOffersLoadingStatus = createAction<boolean>('data/setOffersLoadingStatus');
export const setAuthorizationStatus = createAction<AuthorizationStatus>('user/setAuthorizationStatus');
export const redirectToRoute = createAction<AppRoute>('offer/redirectToRoute');
export const setUserData = createAction<UserData>('user/userData');
