import { render, screen } from '@testing-library/react';
import { makeFakeReviewIncoming } from '../../utils/mocks';
import ReviewItem from './review-item';

const reviewIncoming = makeFakeReviewIncoming();
const { comment, date, user } = reviewIncoming;
user.isPro = true;

describe('Component: ReviewItem', () => {
  it('should render correctly & update user review', () => {
    render(<ReviewItem review={reviewIncoming} />);

    expect(screen.getByText(comment)).toBeInTheDocument();
    expect(screen.getByText(date)).toBeInTheDocument();
    expect(screen.getByText(user.name)).toBeInTheDocument();
  });
});
