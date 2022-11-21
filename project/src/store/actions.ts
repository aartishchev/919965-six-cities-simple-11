import { createAction } from '@reduxjs/toolkit';
import { Cities, SortingOptions } from '../const';

export const setCity = createAction<{targetCity: typeof Cities[number]}>('offer/setCity');
export const updateOffers = createAction('offer/updateOffers');
export const sortOffers = createAction('offer/sortOffers');
export const setSorting = createAction<{targetSorting: typeof SortingOptions[number]}>('offer/setSorting');
