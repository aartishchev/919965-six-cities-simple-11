import { useEffect, useState } from 'react';
import { fetchOffersAction } from '../../store/api-actions';
import { store } from '../../store';
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

function StartPage(): JSX.Element {
  const [activeCard, setActiveCard] = useState<Offer | null>(null);
  const selectedCity = useAppSelector((state) => state.selectedCity);
  const selectedSorting = useAppSelector((state) => state.selectedSorting);
  const areOffersLoading = useAppSelector((state) => state.areOffersLoading);
  const offers = useAppSelector((state) =>
    state.offers
      .filter(({ city }) => city.name === selectedCity)
      .sort((a, b) => {
        switch (state.selectedSorting) {
          case 'Price: high to low':
            return b.price - a.price;
          case 'Price: low to high':
            return a.price - b.price;
          case 'Top rated first':
            return b.rating - a.rating;
          default:
            return 0;
        }
      })
  );

  useEffect(() => {
    store.dispatch(fetchOffersAction());
  }, [selectedCity, selectedSorting]);

  return (
    <>
      <Helmet>
        <title>Six cities. Time to travel!</title>
      </Helmet>

      <main
        className={cn('page__main page__main--index ', {
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

                {areOffersLoading ? (
                  <Loader />
                ) : (
                  <OffersList offers={offers} setActiveCard={setActiveCard} />
                )}
              </section>
              <div className="cities__right-section">
                <Map
                  city={offers[0].city}
                  offers={offers}
                  selectedOffer={activeCard}
                  classList={'cities__map map'}
                />
              </div>
            </div>
          ) : (
            <EmptyList />
          )}
        </div>
      </main>
    </>
  );
}

export default StartPage;
