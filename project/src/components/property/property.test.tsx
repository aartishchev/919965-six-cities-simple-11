import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-router/history-router';
import Property from './property';
import {
  makeFakeOffer,
  makeFakeOffers,
  makeFakeReviewsIncoming,
} from '../../utils/mocks';
import { AuthorizationStatus } from '../../const';
import { HelmetProvider } from 'react-helmet-async';

const mockStore = configureMockStore();
const history = createMemoryHistory();

const fakeStore = mockStore({
  USER: {
    authorizationStatus: AuthorizationStatus.NoAuth,
  },
});

const targetOffer = makeFakeOffer();
const nearbyOffers = makeFakeOffers(3);
const reviewsIncoming = makeFakeReviewsIncoming();

const {
  bedrooms,
  description,
  host,
  maxAdults,
  price,
  title,
} = targetOffer;


describe('Component: Property', () => {
  it('should render correctly', () => {
    targetOffer.type = 'house';

    render(
      <Provider store={fakeStore}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <Property
              targetOffer={targetOffer}
              nearbyOffers={nearbyOffers}
              reviewsIncoming={reviewsIncoming}
            />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(`€${price}`)).toBeInTheDocument();
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(`${bedrooms} Bedrooms`)).toBeInTheDocument();
    expect(screen.getByText(`Max ${maxAdults} adults`)).toBeInTheDocument();
    expect(screen.getByAltText(/host avatar/i)).toHaveAttribute('src', host.avatarUrl);
    expect(screen.getByText(description)).toBeInTheDocument();
  });
});
