import { createAction } from '@reduxjs/toolkit';
import { Cities } from '../const';

export const setCity = createAction<{targetCity: typeof Cities[number]}>('offer/setCity');
export const updateOffers = createAction('offer/updateOffers');
