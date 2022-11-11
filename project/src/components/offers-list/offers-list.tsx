import { Dispatch, SetStateAction } from 'react';
import { Offer } from '../../types/offer';
import PlaceItem from '../place-item/place-item';

type OffersListProps = {
  offers: Offer[];
  setActiveCard: Dispatch<SetStateAction<Offer | null>>;
};

function OffersList({ offers, setActiveCard }: OffersListProps): JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => <PlaceItem offer={offer} key={offer.id} setActiveCard={setActiveCard} />)}
    </div>
  );
}

export default OffersList;
