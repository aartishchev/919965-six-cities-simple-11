import { createAction } from '@reduxjs/toolkit';
import { Cities, SortingOptions } from '../const';
import { Offer } from '../types/offer';
import { AuthorizationStatus } from '../const';

export const setCity = createAction<{targetCity: typeof Cities[number]}>('offer/setCity');
export const setSorting = createAction<{targetSorting: typeof SortingOptions[number]}>('offer/setSorting');
export const setOffers = createAction<Offer[]>('data/setOffers');
export const setOffersLoadingStatus = createAction<boolean>('data/setOffersLoadingStatus');
export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');
