import { ReviewIncoming } from '../../types/review';
import Rating from '../rating/rating';

type ReviewItemProps = {
  review: ReviewIncoming;
};

function ReviewItem({ review }: ReviewItemProps): JSX.Element {
  const { comment, date, rating, user } = review;

  return (
    <li className="reviews__item" data-testid="reviewItem">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={user.avatarUrl}
            width="54"
            height="54"
            alt="Reviews avatar"
          />
        </div>
        <span className="reviews__user-name">{user.name}</span>
        {user.isPro && <span className="property__user-status">Pro</span>}
      </div>
      <div className="reviews__info">
        <Rating
          rating={rating}
          render={(roundedRating) => (
            <div className="reviews__rating rating">
              <div className="reviews__stars rating__stars">
                <span style={{ width: `${roundedRating}%` }} />
                <span className="visually-hidden">Rating</span>
              </div>
            </div>
          )}
        />

        <p className="reviews__text">{comment}</p>

        <time className="reviews__time">{date}</time>
      </div>
    </li>
  );
}

export default ReviewItem;
