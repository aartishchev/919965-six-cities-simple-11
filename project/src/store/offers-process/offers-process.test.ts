import { DEFAULT_CITY, DEFAULT_SORTING, SortingOptions } from './../../const';
import { makeFakeCity } from './../../utils/mocks';
import { OffersProcess } from '../../types/state';
import { offersProcess, setCity, setSorting } from './offers-process';

const city = makeFakeCity();
const sorting = SortingOptions[Math.floor(Math.random() * SortingOptions.length)];

describe('Reducer: offersProcess', () => {
  let initialState: OffersProcess;

  beforeEach(() => {
    initialState = {
      selectedCity: DEFAULT_CITY,
      selectedSorting: DEFAULT_SORTING,
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(
      offersProcess.reducer(undefined, { type: 'UNKNOWN_ACTION' })
    ).toEqual(initialState);
  });

  it('should set new city', () => {
    expect(
      offersProcess.reducer(initialState, setCity({ targetCity: city.name }))
    ).toEqual({ ...initialState, selectedCity: city.name });
  });

  it('should set new sorting', () => {
    expect(
      offersProcess.reducer(
        initialState,
        setSorting({ targetSorting: sorting })
      )
    ).toEqual({ ...initialState, selectedSorting: sorting });
  });
});
