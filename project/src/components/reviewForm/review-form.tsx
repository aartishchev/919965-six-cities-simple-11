import { ChangeEvent, Fragment, useState } from 'react';
import { ReviewOutgoing } from '../../types/review';
import { ExtremeRatingValue, FormInputLength, RatingScores } from '../../const';

function ReviewForm (): JSX.Element {
  const [reviewPayload, setReviewPayload] = useState<ReviewOutgoing>({
    review: '',
    rating: ExtremeRatingValue.DefaultRating
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

  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>

      <div className="reviews__rating-form form__rating">
        { RatingScores.map((score) => (
          <Fragment key={ score.value }>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={ score.value }
              id={ `${score.value}-stars` }
              type="radio"
              checked={ reviewPayload.rating === score.value }
              onChange={ handleRatingChange }
            />
            <label
              htmlFor={ `${score.value}-stars` }
              className="reviews__rating-label form__rating-label"
              title={ score.title }
            >
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
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
        maxLength={ FormInputLength.MaxLength }
        onChange={ handleRatingChange }
      />

      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={ !isValid }
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;
