import { useCallback, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useAppSelector } from '../../hooks';
import { Offer } from '../../types/offer';
import EmptyList from '../../components/empty-list/empty-list';
import OptionsForm from '../../components/options-form/options-form';
import OffersList from '../../components/offers-list/offers-list';
import CityTabs from '../../components/city-tabs/city-tabs';
import Map from '../../components/map/map';
import Loader from '../../components/loader/loader';
import cn from 'classnames';
import {
  getSelectedCity,
  getSelectedSorting,
} from '../../store/offers-process/offers-process-selectors';
import {
  getDataLoadingStatus,
  getOffers,
} from '../../store/offers-data/offers-data-selectors';

function StartPage(): JSX.Element {
  const [activeCard, setActiveCard] = useState<Offer | null>(null);
  const selectedCity = useAppSelector(getSelectedCity);
  const selectedSorting = useAppSelector(getSelectedSorting);
  const isDataLoading = useAppSelector(getDataLoadingStatus);
  const offers = useAppSelector(getOffers);
  const filteredOffers = useMemo(
    () => offers.filter(({ city }) => city.name === selectedCity),
    [offers, selectedCity]
  );

  const sortedOffers = useMemo(
    () =>
      filteredOffers.sort((a, b) => {
        switch (selectedSorting) {
          case 'Price: high to low':
            return b.price - a.price;
          case 'Price: low to high':
            return a.price - b.price;
          case 'Top rated first':
            return b.rating - a.rating;
          default:
            return 0;
        }
      }),
    [filteredOffers, selectedSorting]
  );

  const handleCardMouseOver = useCallback((offer: Offer | null) => {
    setActiveCard(offer);
  }, []);

  if (isDataLoading) {
    return <Loader />;
  }

  return (
    <>
      <Helmet>
        <title>Six cities. Time to travel!</title>
      </Helmet>

      <main
        className={cn('page__main page__main--index', {
          'page__main--index-empty': !offers.length,
        })}
      >
        <h1 className="visually-hidden">Cities</h1>

        <CityTabs />

        <div className="cities">
          {offers.length ? (
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">
                  {`${offers.length} places to stay in ${selectedCity}`}
                </b>

                <OptionsForm />

                <OffersList
                  offers={sortedOffers}
                  handleCardMouseOver={handleCardMouseOver}
                />

              </section>
              <div className="cities__right-section">
                <Map
                  city={filteredOffers[0].city}
                  offers={filteredOffers}
                  selectedOffer={activeCard}
                  classList={'cities__map map'}
                />
              </div>
            </div>
          ) : (
            <EmptyList selectedCity={selectedCity} />
          )}
        </div>
      </main>
    </>
  );
}

export default StartPage;
