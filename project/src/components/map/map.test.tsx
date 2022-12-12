import { render, screen } from '@testing-library/react';
import Map from './map';
import { makeFakeCity, makeFakeOffers } from '../../utils/mocks';
import { datatype } from 'faker';

const offers = makeFakeOffers();
const selectedOffer = offers[0];
const city = makeFakeCity();
const classlist = datatype.string();

describe('Component: Map', () => {
  it('should render correctly', () => {
    render(
      <Map
        offers={offers}
        selectedOffer={selectedOffer}
        city={city}
        classList={classlist}
      />
    );

    expect(screen.getByTestId('map')).toBeInTheDocument();
    screen.getByTestId('map').classList.contains(classlist);
  });
});
