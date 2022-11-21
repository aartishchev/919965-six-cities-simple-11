import { createReducer } from '@reduxjs/toolkit';
import { setCity, setSorting, sortOffers, updateOffers } from './actions';
import { DEFAULT_CITY, DEFAULT_SORTING } from '../const';
import { offers } from '../mocks/offers';

const initialState = {
  offers: offers.filter(({ city }) => city.name === DEFAULT_CITY),
  selectedCity: DEFAULT_CITY,
  selectedSorting: DEFAULT_SORTING
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCity, (state, action) => {
      const { targetCity } = action.payload;
      state.selectedCity = targetCity;
    })
    .addCase(setSorting, (state, action) => {
      const { targetSorting } = action.payload;
      state.selectedSorting = targetSorting;
    })
    .addCase(updateOffers, (state) => {
      state.offers = offers.filter(({ city }) => city.name === state.selectedCity);
    })
    .addCase(sortOffers, (state) => {
      if (state.selectedSorting === DEFAULT_SORTING) {
        state.offers = offers.filter(({ city }) => city.name === state.selectedCity);
      } else {
        state.offers = state.offers.sort((a, b) => {
          switch (state.selectedSorting) {
            case 'Price: high to low':
              return b.price - a.price;
            case 'Price: low to high':
              return a.price - b.price;
            case 'Top rated first':
              return b.rating - a.rating;
            default:
              return 0;
          }
        });
      }
    });
});

export { reducer };
