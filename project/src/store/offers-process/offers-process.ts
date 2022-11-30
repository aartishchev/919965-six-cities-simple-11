import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Cities, DEFAULT_CITY, DEFAULT_SORTING, NameSpace, SortingOptions } from '../../const';
import { OffersProcess } from '../../types/state';

const initialState: OffersProcess = {
  selectedCity: DEFAULT_CITY,
  selectedSorting: DEFAULT_SORTING,
};

export const offersProcess = createSlice({
  name: NameSpace.Offer,
  initialState,
  reducers: {
    setCity: (state, action: PayloadAction<{ targetCity: typeof Cities[number] }>) => {
      const { targetCity } = action.payload;
      state.selectedCity = targetCity;
    },
    setSorting: (state, action: PayloadAction<{ targetSorting: typeof SortingOptions[number] }>) => {
      const { targetSorting } = action.payload;
      state.selectedSorting = targetSorting;
    },
  },
});

export const { setCity, setSorting} = offersProcess.actions;
