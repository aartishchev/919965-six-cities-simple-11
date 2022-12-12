import { render, screen } from '@testing-library/react';
import { Cities } from '../../const';
import EmptyList from './empty-list';

const selectedCity = Cities[Math.floor(Math.random() * Cities.length)];

describe('Component: EmptyList', () => {
  it('should render correctly', () => {
    render(<EmptyList selectedCity={selectedCity} />);

    expect(screen.getByText('No places to stay available')).toBeInTheDocument();
    expect(
      screen.getByText(
        `We could not find any property available at the moment in ${selectedCity}`
      )
    ).toBeInTheDocument();
  });
});
