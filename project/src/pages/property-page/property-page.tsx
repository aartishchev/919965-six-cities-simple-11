import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useParams } from 'react-router-dom';
import { fetchTargetOfferAction } from '../../store/api-actions';
import { Offer } from '../../types/offer';
import NotFoundPage from '../not-found-page/not-found-page';
import Loader from '../../components/loader/loader';
import Property from '../../components/property/property';
import { getDataLoadingStatus, getErrorStatus, getNearbyOffers, getReviewsIncoming, getTargetOffer } from '../../store/offers-data/offers-data-selectors';

function PropertyPage(): JSX.Element {
  const { id: offerId } = useParams();
  const nearbyOffers = useAppSelector(getNearbyOffers);
  const targetOffer = useAppSelector(getTargetOffer);
  const isError = useAppSelector(getErrorStatus);
  const isDataLoading = useAppSelector(getDataLoadingStatus);
  const reviewsIncoming = useAppSelector(getReviewsIncoming);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (offerId) {
      dispatch(fetchTargetOfferAction(Number(offerId)));
    }
  }, [offerId, dispatch]);

  if (isError && !isDataLoading) {
    return <NotFoundPage />;
  }

  if (isDataLoading) {
    return <Loader />;
  }

  return (
    <>
      <Helmet>
        <title>Six cities. Consider THIS!</title>
      </Helmet>

      <Property
        targetOffer={targetOffer as Offer}
        nearbyOffers={nearbyOffers}
        reviewsIncoming={reviewsIncoming}
      />
    </>
  );
}

export default PropertyPage;
