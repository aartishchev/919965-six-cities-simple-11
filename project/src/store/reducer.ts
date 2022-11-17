import { createReducer } from '@reduxjs/toolkit';
import { setCity, updateOffers } from './actions';
import { DEFAULT_CITY } from '../const';
import { offers } from '../mocks/offers';

const initialState = {
  selectedCity: DEFAULT_CITY,
  offers: offers.filter(({ city }) => city.name === DEFAULT_CITY)
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCity, (state, action) => {
      const { targetCity } = action.payload;
      state.selectedCity = targetCity;
    })
    .addCase(updateOffers, (state) => {
      state.offers = offers.filter(({ city }) => city.name === state.selectedCity);
    });
});

export { reducer };
