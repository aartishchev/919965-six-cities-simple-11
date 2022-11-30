import { Offer } from '../../types/offer';
import PlaceItem from '../place-item/place-item';

type OffersListProps = {
  offers: Offer[];
  handleCardMouseOver?: (offer: Offer | null) => void;
};

function OffersList({ offers, handleCardMouseOver }: OffersListProps): JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <PlaceItem offer={offer} key={offer.id} handleCardMouseOver={handleCardMouseOver} />
      ))}
    </div>
  );
}

export default OffersList;
