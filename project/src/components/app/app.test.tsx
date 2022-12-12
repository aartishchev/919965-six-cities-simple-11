import App from './app';
import HistoryRouter from '../history-router/history-router';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { OffersProcess, UserProcess, OffersData, State } from '../../types/state';
import { Action } from 'redux';
import { createAPI } from '../../services/api';
import {
  AppRoute,
  AuthorizationStatus,
  DEFAULT_CITY,
  DEFAULT_SORTING,
} from '../../const';
import {
  makeFakeOffers,
  makeFakeReviewsIncoming,
  makeFakeUserData,
} from '../../utils/mocks';

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
      <App />
    </HistoryRouter>
  </Provider>
);

describe('Application routing', () => {
  it('should render "StartPage" when user navigate to "/"', () => {
    history.push(AppRoute.Main);

    render(fakeApp);

    expect(screen.getByText('Cities')).toBeInTheDocument();
    expect(screen.getByText('Paris')).toBeInTheDocument();
    expect(screen.getByText('Cologne')).toBeInTheDocument();
    expect(screen.getByText('Brussels')).toBeInTheDocument();
    expect(screen.getByText('Amsterdam')).toBeInTheDocument();
    expect(screen.getByText('Hamburg')).toBeInTheDocument();
    expect(screen.getByText('Dusseldorf')).toBeInTheDocument();
  });

  it('should render "PropertyPage" when user navigate to "/offer/:id"', () => {
    history.push(AppRoute.Room);

    render(fakeApp);

    expect(screen.getByText(/What's inside/i)).toBeInTheDocument();
    expect(screen.getByText(/Meet the host/i)).toBeInTheDocument();
    expect(screen.getByText(/Other places in the neighbourhood/i)).toBeInTheDocument();
  });

  it('should render "LoginPage" when user navigate to "/login"', () => {
    history.push(AppRoute.Login);

    render(fakeApp);

    expect(screen.getByRole('heading').textContent).toBe('Sign in');
    expect(screen.getByRole('button').textContent).toBe('Sign in');
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
  });


  it('should render "NotFoundPage" when user navigate to non-existent route', () => {
    history.push('/non-existent-route');

    render(fakeApp);

    expect(screen.getByText('404 Not Found')).toBeInTheDocument();
  });
});
