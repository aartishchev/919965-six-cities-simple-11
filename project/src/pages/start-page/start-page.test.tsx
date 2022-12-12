import thunk, { ThunkDispatch } from 'redux-thunk';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import {
  OffersProcess,
  UserProcess,
  OffersData,
  State,
} from '../../types/state';
import { Action } from 'redux';
import { createAPI } from '../../services/api';
import {
  AuthorizationStatus,
  DEFAULT_CITY,
  DEFAULT_SORTING,
} from '../../const';
import {
  makeFakeOffers,
  makeFakeReviewsIncoming,
  makeFakeUserData,
} from '../../utils/mocks';
import StartPage from './start-page';
import HistoryRouter from '../../components/history-router/history-router';
import { HelmetProvider } from 'react-helmet-async';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<
  State,
  Action<string>,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

const mockUserState: UserProcess = {
  authorizationStatus: AuthorizationStatus.Auth,
  userData: makeFakeUserData(),
};

const fakeOffers = makeFakeOffers();

const mockDataState: OffersData = {
  offers: fakeOffers,
  targetOffer: fakeOffers[0],
  nearbyOffers: makeFakeOffers(3),
  reviewsIncoming: makeFakeReviewsIncoming(),
  isDataLoading: false,
  isError: false,
};

const mockOfferState: OffersProcess = {
  selectedCity: DEFAULT_CITY,
  selectedSorting: DEFAULT_SORTING,
};

const fakeStore = mockStore({
  USER: mockUserState,
  DATA: mockDataState,
  OFFER: mockOfferState,
});

const history = createMemoryHistory();

const fakeApp = (
  <Provider store={fakeStore}>
    <HistoryRouter history={history}>
      <HelmetProvider>
        <StartPage />
      </HelmetProvider>
    </HistoryRouter>
  </Provider>
);

describe('Component: StartPage', () => {
  it('should render correctly if places available', () => {
    mockDataState.offers[0].city.name = mockOfferState.selectedCity;

    render(fakeApp);

    const filteredOffers = mockDataState.offers.filter(
      ({ city }) => city.name === mockOfferState.selectedCity
    );

    expect(
      screen.getByText(
        `${filteredOffers.length} places to stay in ${mockOfferState.selectedCity}`
      )
    ).toBeInTheDocument();
  });

  it('should render correctly when no places available', () => {
    mockDataState.offers = [];

    render(fakeApp);

    expect(
      screen.getByText(
        `We could not find any property available at the moment in ${mockOfferState.selectedCity}`
      )
    ).toBeInTheDocument();
  });
});
