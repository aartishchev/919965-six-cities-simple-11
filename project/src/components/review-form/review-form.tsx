import { ChangeEvent, FormEvent, Fragment, useState } from 'react';
import { sendReviewAction } from '../../store/api-actions';
import { ReviewOutgoing } from '../../types/review';
import { useAppDispatch } from '../../hooks';
import { Offer } from '../../types/offer';
import { ExtremeRatingValue, FormInputLength, RatingScores } from '../../const';

type ReviewFormProps = {
  targetId: Offer['id'];
};

function ReviewForm({ targetId }: ReviewFormProps): JSX.Element {
  const [reviewPayload, setReviewPayload] = useState<ReviewOutgoing>({
    review: '',
    rating: ExtremeRatingValue.DefaultRating,
  });

  const handleRatingChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setReviewPayload({ ...reviewPayload, [name]: value });
  };

  const isValid = () => {
    const isTextValid =
      reviewPayload.review.length > FormInputLength.MinLength &&
      reviewPayload.review.length < FormInputLength.MaxLength;

    const isRated = reviewPayload.rating > 0;

    return isTextValid && isRated;
  };

  const dispatch = useAppDispatch();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payload = {
      ...reviewPayload,
      targetId,
    };
    dispatch(sendReviewAction(payload));
    setReviewPayload({ review: '', rating: ExtremeRatingValue.DefaultRating });
  };

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={handleSubmit}
    >
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>

      <div className="reviews__rating-form form__rating">
        {[...RatingScores].reverse().map((score) => (
          <Fragment key={score.value}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={score.value}
              id={`${score.value}-stars`}
              type="radio"
              checked={reviewPayload.rating.toString() === score.value.toString()}
              onChange={handleRatingChange}
            />
            <label
              htmlFor={`${score.value}-stars`}
              className="reviews__rating-label form__rating-label"
              title={score.title}
            >
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star" />
              </svg>
            </label>
          </Fragment>
        ))}
      </div>

      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        maxLength={FormInputLength.MaxLength}
        onChange={handleRatingChange}
      />

      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your stay
          with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!isValid()}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;
