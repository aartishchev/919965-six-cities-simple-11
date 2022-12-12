import { render, screen } from '@testing-library/react';
import { makeFakeReviewsIncoming } from '../../utils/mocks';
import ReviewsList from './reviews-list';

const reviewsIncoming = makeFakeReviewsIncoming();

describe('Component: ReviewsList', () => {
  it('should render correctly', () => {
    render(<ReviewsList reviews={reviewsIncoming} />);

    expect(screen.getAllByTestId(/reviewItem/i).length).toBe(reviewsIncoming.length);
  });
});
