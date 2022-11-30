import { memo } from 'react';
import { Link } from 'react-router-dom';
import { Offer } from '../../types/offer';
import Rating from '../rating/rating';

type PlaceItemProps = {
  offer: Offer;
  handleCardMouseOver?: (offer: Offer | null) => void;
};

function PlaceItem({ offer, handleCardMouseOver }: PlaceItemProps): JSX.Element {
  const { previewImage, isPremium, price, title, rating, type } = offer;

  const handleCardHover = (value: Offer | null) => {
    if (handleCardMouseOver) {
      handleCardMouseOver(value);
    }
  };

  return (
    <article
      className="cities__card place-card"
      onMouseEnter={() => { handleCardHover(offer); } }
      onMouseLeave={() => { handleCardHover(null); } }
    >
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}

      <div className="cities__image-wrapper place-card__image-wrapper">
        <img
          className="place-card__image"
          src={previewImage}
          width="260"
          height="200"
          alt="Place"
        />
      </div>

      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
        </div>

        <div className="place-card__rating rating">
          <Rating
            rating={rating}
            render={(roundedRating) => (
              <div className="place-card__stars rating__stars">
                <span style={{ width: `${roundedRating}%` }} />
                <span className="visually-hidden">Rating</span>
              </div>
            )}
          />
        </div>

        <h2 className="place-card__name">
          <Link to={`/offer/${offer.id}`}>{title}</Link>
        </h2>

        <p className="place-card__type" style={{ textTransform: 'capitalize' }}>
          {type}
        </p>
      </div>
    </article>
  );
}

export default memo(PlaceItem);
