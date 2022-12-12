import { render, screen } from '@testing-library/react';
import Rating from './rating';


describe('Component: Rating', () => {
  it('should render correctly after function prop calculation been adjusted upwords', () => {
    render(
      <Rating
        rating={2.5}
        render={(roundedRating: number) => (
          <div className="property__rating rating">
            <span>{`width: ${roundedRating}% `}</span>
          </div>
        )}
      />
    );

    expect(screen.getByText(/width: 60%/i)).toBeInTheDocument();
  });

  it('should render correctly after function prop calculation been adjusted downwards', () => {
    render(
      <Rating
        rating={4.3}
        render={(roundedRating: number) => (
          <div className="property__rating rating">
            <span>{`width: ${roundedRating}% `}</span>
          </div>
        )}
      />
    );

    expect(screen.getByText(/width: 80%/i)).toBeInTheDocument();
  });
});
