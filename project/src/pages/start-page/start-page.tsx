import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useAppSelector } from '../../hooks';
import { Offer } from '../../types/offer';
import { Cities } from '../../const';
import { useAppDispatch } from '../../hooks';
import { setCity, updateOffers } from '../../store/actions';
import OffersList from '../../components/offers-list/offers-list';
import Map from '../../components/map/map';
import cn from 'classnames';
import EmptyList from '../../components/empty-list/empty-list';

function StartPage(): JSX.Element {
  const [activeCard, setActiveCard] = useState<Offer | null>(null);
  const selectedCity = useAppSelector((state) => state.selectedCity);
  const offers = useAppSelector((state) => state.offers);

  const dispatch = useAppDispatch();

  const onChangeCity = (city: typeof Cities[number]) => {
    dispatch(setCity({ targetCity: city }));
    dispatch(updateOffers());
  };

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

        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              {Cities.map((city) => {
                const isActive = city === selectedCity;
                return (
                  <li className="locations__item" key={city}>
                    <a
                      onClick={(event) => {
                        event.preventDefault();
                        onChangeCity(city);
                      }}
                      className={cn('locations__item-link tabs__item', {
                        'tabs__item--active': isActive,
                      })}
                      href="#"
                    >
                      <span>{city}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </section>
        </div>

        <div className="cities">
          {offers.length ? (
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">
                  {`${offers.length} places to stay in ${selectedCity}`}
                </b>
                <form className="places__sorting" action="#" method="get">
                  <span className="places__sorting-caption">Sort by </span>
                  <span className="places__sorting-type" tabIndex={0}>
                    Popular
                    <svg className="places__sorting-arrow" width="7" height="4">
                      <use xlinkHref="#icon-arrow-select"></use>
                    </svg>
                  </span>
                  <ul className="places__options places__options--custom places__options--opened">
                    <li
                      className="places__option places__option--active"
                      tabIndex={0}
                    >
                      Popular
                    </li>
                    <li className="places__option" tabIndex={0}>
                      Price: low to high
                    </li>
                    <li className="places__option" tabIndex={0}>
                      Price: high to low
                    </li>
                    <li className="places__option" tabIndex={0}>
                      Top rated first
                    </li>
                  </ul>
                </form>

                <OffersList offers={offers} setActiveCard={setActiveCard} />
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
