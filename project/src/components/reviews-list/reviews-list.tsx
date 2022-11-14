import { Fragment } from 'react';
import { ReviewIncoming } from '../../types/review';
import ReviewItem from '../review-item/review-item';

type ReviewsListProps = {
  reviews: ReviewIncoming[];
};

function ReviewsList({ reviews }: ReviewsListProps): JSX.Element {
  return (
    <ul className="reviews__list">
      {reviews.map((review) => (
        <Fragment key={review.id}>
          <ReviewItem review={review} />
        </Fragment>
      ))}
    </ul>
  );
}

export default ReviewsList;
