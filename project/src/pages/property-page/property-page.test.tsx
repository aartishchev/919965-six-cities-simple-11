import thunk, { ThunkDispatch } from 'redux-thunk';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { OffersData, State } from '../../types/state';
import { Action } from 'redux';
import { createAPI } from '../../services/api';
import { AuthorizationStatus } from '../../const';
import { makeFakeOffers, makeFakeReviewsIncoming } from '../../utils/mocks';
import HistoryRouter from '../../components/history-router/history-router';
import PropertyPage from './property-page';
import { HelmetProvider } from 'react-helmet-async';
import { Offer } from '../../types/offer';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<
  State,
  Action<string>,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

const fakeOffers = makeFakeOffers();

const mockDataState: OffersData = {
  offers: fakeOffers,
  targetOffer: fakeOffers[0] as Offer,
  nearbyOffers: makeFakeOffers(3),
  reviewsIncoming: makeFakeReviewsIncoming(),
  isDataLoading: false,
  isError: false,
};

const fakeStore = mockStore({
  DATA: mockDataState,
  USER: {
    authorizationStatus: AuthorizationStatus.Auth,
  },
});

const history = createMemoryHistory();

const fakeApp = (
  <Provider store={fakeStore}>
    <HistoryRouter history={history}>
      <HelmetProvider>
        <PropertyPage />
      </HelmetProvider>
    </HistoryRouter>
  </Provider>
);

describe('Component: PropertyPage', () => {
  it('should render NotFoundPage when no property returned', () => {
    mockDataState.isError = true;
    mockDataState.isDataLoading = false;

    render(fakeApp);

    expect(screen.getByText(/404 not found/i)).toBeInTheDocument();
  });


  it('should render Loader when loading state', () => {
    mockDataState.isDataLoading = true;

    render(fakeApp);

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('should render property when targetProperty found', () => {
    mockDataState.isError = false;
    mockDataState.isDataLoading = false;
    mockDataState.targetOffer = fakeOffers[0];

    render(fakeApp);

    expect(
      screen.getByText(mockDataState.targetOffer.description)
    ).toBeInTheDocument();
  });
});
