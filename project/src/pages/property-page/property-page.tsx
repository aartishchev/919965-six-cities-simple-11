import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Navigate, useParams } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { fetchTargetOfferAction } from '../../store/api-actions';
import ReviewForm from '../../components/review-form/review-form';
import ReviewsList from '../../components/reviews-list/reviews-list';
import OffersList from '../../components/offers-list/offers-list';
import Map from '../../components/map/map';
import Rating from '../../components/rating/rating';
import cn from 'classnames';

function PropertyPage(): JSX.Element {
  const { id: offerId } = useParams();
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const nearbyOffers = useAppSelector((state) => state.nearbyOffers);
  const targetOffer = useAppSelector((state) => state.targetOffer);
  const reviewsIncoming = useAppSelector((state) =>
    state.reviewsIncoming.slice(0, 10)
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (offerId) {
      dispatch(fetchTargetOfferAction(Number(offerId)));
    }
  }, []);

  if (!targetOffer || !nearbyOffers || !reviewsIncoming) {
    return <Navigate to={AppRoute.Fallback} />;
  }

  const {
    images,
    bedrooms,
    description,
    goods,
    host,
    isPremium,
    maxAdults,
    price,
    title,
    type,
    rating,
  } = targetOffer;

  const imagesWithIndex = images.map((image, index) => ({ url: image, index }));
  const goodsWithIndex = goods.map((good, index) => ({ title: good, index }));

  return (
    <>
      <Helmet>
        <title>Six cities. Consider THIS!</title>
      </Helmet>

      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {imagesWithIndex.slice(0, 6).map((image) => (
                <div className="property__image-wrapper" key={image.index}>
                  <img
                    className="property__image"
                    src={image.url}
                    alt="Studio"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="property__container container">
            <div className="property__wrapper">
              {isPremium && (
                <div className="property__mark">
                  <span>Premium</span>
                </div>
              )}

              <div className="property__name-wrapper">
                <h1 className="property__name">{title}</h1>
              </div>

              <Rating
                rating={rating}
                render={(roundedRating: number) => (
                  <div className="property__rating rating">
                    <div className="property__stars rating__stars">
                      <span style={{ width: `${roundedRating}%` }} />
                      <span className="visually-hidden">Rating</span>
                    </div>
                    <span className="property__rating-value rating__value">
                      {rating}
                    </span>
                  </div>
                )}
              />

              <ul className="property__features">
                <li
                  className="property__feature property__feature--entire"
                  style={{ textTransform: 'capitalize' }}
                >
                  {type}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {bedrooms} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max {maxAdults} adults
                </li>
              </ul>

              <div className="property__price">
                <b className="property__price-value">&euro;{price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>

              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {goodsWithIndex.map((good) => (
                    <li className="property__inside-item" key={good.index}>
                      {good.title}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>

                <div className="property__host-user user">
                  <div
                    className={cn(
                      'property__avatar-wrapper user__avatar-wrapper',
                      { 'property__avatar-wrapper--pro': host.isPro }
                    )}
                  >
                    <img
                      className="property__avatar user__avatar"
                      src={host.avatarUrl}
                      width="74"
                      height="74"
                      alt="Host avatar"
                    />
                  </div>
                  <span className="property__user-name">{host.name}</span>
                  {host.isPro && (
                    <span className="property__user-status">Pro</span>
                  )}
                </div>

                <div className="property__description">
                  <p className="property__text">{description}</p>
                </div>
              </div>

              <section className="property__reviews reviews">
                <h2 className="reviews__title">
                  Reviews &middot;{' '}
                  <span className="reviews__amount">
                    {reviewsIncoming.length}
                  </span>
                </h2>

                <ReviewsList reviews={reviewsIncoming} />

                {authorizationStatus === AuthorizationStatus.Auth ? (
                  <ReviewForm targetId={targetOffer.id} />
                ) : null}
              </section>
            </div>
          </div>

          <Map
            city={targetOffer.city}
            offers={nearbyOffers}
            selectedOffer={targetOffer}
            classList={'property__map map'}
          />
        </section>

        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <div className="near-places__list places__list">
              <OffersList offers={nearbyOffers} />
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

export default PropertyPage;
