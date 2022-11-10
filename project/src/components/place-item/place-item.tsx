import { Dispatch, SetStateAction } from 'react';
import { Link } from 'react-router-dom';
import { MAX_RATING } from '../../const';
import { Offer } from '../../types/offer';

type PlaceItemProps = {
  offer: Offer;
  setActiveCard: Dispatch<SetStateAction<Offer | null>>;
};

function PlaceItem({ offer, setActiveCard }: PlaceItemProps): JSX.Element {
  const { previewImage, isPremium, price, title, rating, type } = offer;
  const renderPremiumButton = () => {
    if (isPremium) {
      return (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      );
    }
  };

  const calculateRating = (offerRating: Offer['rating']) => Math.round((offerRating / MAX_RATING) * 100);

  return (
    <article
      className="cities__card place-card"
      onMouseEnter={ () => setActiveCard(offer) }
      onMouseLeave={ () => setActiveCard(null) }
    >
      { renderPremiumButton() }

      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img
            className="place-card__image"
            src={ previewImage }
            width="260"
            height="200"
            alt="Place image"
          />
        </a>
      </div>

      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{ price }</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
        </div>

        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${calculateRating(rating)}%` }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>

        <h2 className="place-card__name">
          <Link to={ `/offer/${offer.id}` }>{ title }</Link>
        </h2>

        <p className="place-card__type" style={{ textTransform: 'capitalize' }}>{ type }</p>
      </div>
    </article>
  );
}

export default PlaceItem;
