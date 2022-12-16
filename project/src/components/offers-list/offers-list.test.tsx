import { render, screen } from '@testing-library/react';
import { makeFakeOffers } from '../../utils/mocks';
import HistoryRouter from '../history-router/history-router';
import OffersList from './offers-list';
import { createMemoryHistory } from 'history';

const offers = makeFakeOffers();
const history = createMemoryHistory();

describe('Component: OffersList', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <OffersList offers={offers} handleCardMouseOver={jest.fn()} />
      </HistoryRouter>
    );

    expect(screen.getAllByTestId('placeItem').length).toBe(offers.length);
  });
});
