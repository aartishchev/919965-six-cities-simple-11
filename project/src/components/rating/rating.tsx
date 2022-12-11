import { ExtremeRatingValue } from '../../const';
import { Offer } from '../../types/offer';

type RatingProps = {
  rating: Offer['rating'];
  render: (roundedRating: number) => JSX.Element;
};

function Rating({rating, render}: RatingProps): JSX.Element {
  const roundedRating = Math.round(rating) / ExtremeRatingValue.MaxRating * 100;
  return render(roundedRating);
}

export default Rating;
