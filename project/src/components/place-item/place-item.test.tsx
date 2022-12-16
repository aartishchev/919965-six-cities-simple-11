import { render, screen } from '@testing-library/react';
import { makeFakeOffer } from '../../utils/mocks';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-router/history-router';
import PlaceItem from './place-item';

const offer = makeFakeOffer();
const { previewImage, price, title } = offer;
const history = createMemoryHistory();

describe('Component: PlaceItem', () => {
  offer.isPremium = true;
  offer.type = 'house';

  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <PlaceItem offer={offer} handleCardMouseOver={jest.fn()} />
      </HistoryRouter>
    );

    expect(screen.getByText(`€${price}`)).toBeInTheDocument();
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText('Premium')).toBeInTheDocument();
    expect(screen.getByText(/house/i)).toBeInTheDocument();
    expect(screen.getByAltText(/place/i)).toHaveAttribute('src', previewImage);
  });
});
