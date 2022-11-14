import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Offer } from '../../types/offer';
import { Cities } from '../../const';
import OffersList from '../../components/offers-list/offers-list';
import Map from '../../components/map/map';

type StartPageProps = {
  offers: Offer[];
};

function StartPage({ offers }: StartPageProps): JSX.Element {
  const [activeCard, setActiveCard] = useState<Offer | null>(null);

  return (
    <>
      <Helmet>
        <title>Six cities. Time to travel!</title>
      </Helmet>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>

        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              {Cities.map((city) => (
                <li className="locations__item" key={city}>
                  <a className="locations__item-link tabs__item" href="#">
                    <span>{city}</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">
                {offers.length} places to stay in Amsterdam
              </b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by{' '}</span>
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
        </div>
      </main>
    </>
  );
}

export default StartPage;
