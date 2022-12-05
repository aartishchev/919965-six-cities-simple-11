import {
  fetchOffersAction,
  fetchTargetOfferAction,
  sendReviewAction,
} from './../api-actions';
import { makeFakeOffer, makeFakeReviewsIncoming } from './../../utils/mocks';
import { OffersData } from '../../types/state';
import { offersData } from './offers-data';
import { datatype } from 'faker';
import { Offer } from '../../types/offer';
import { ReviewIncoming } from '../../types/review';

const offer = makeFakeOffer();
const offers = Array.from({ length: datatype.number(10) }, () =>
  makeFakeOffer()
);

const targetOffer = offer;
const reviewsIncoming = makeFakeReviewsIncoming();
const nearbyOffers = offers;
const targetOfferPayload: [Offer, Offer[], ReviewIncoming[]] = [
  targetOffer,
  nearbyOffers,
  reviewsIncoming,
];

describe('Reducer: offersData', () => {
  let initialState: OffersData;

  beforeEach(() => {
    initialState = {
      offers: [],
      targetOffer: null,
      nearbyOffers: [],
      reviewsIncoming: [],
      isDataLoading: false,
      isError: true,
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(offersData.reducer(undefined, { type: 'UNKNOWN_ACTION' })).toEqual(
      initialState
    );
  });

  it('should set isDataLoading to "true" when pending', () => {
    expect(
      offersData.reducer(initialState, { type: fetchOffersAction.pending.type })
    ).toEqual({ ...initialState, isDataLoading: true });
    expect(
      offersData.reducer(initialState, {
        type: fetchTargetOfferAction.pending.type,
      })
    ).toEqual({ ...initialState, isDataLoading: true });
  });

  it('should set loaded offers', () => {
    expect(
      offersData.reducer(initialState, {
        type: fetchOffersAction.fulfilled.type,
        payload: offers,
      })
    ).toEqual({ ...initialState, offers, isDataLoading: false });
  });

  it('should set isDataLoading to "false"', () => {
    expect(
      offersData.reducer(initialState, {
        type: fetchOffersAction.rejected.type,
      })
    ).toEqual({ ...initialState, isDataLoading: false });
  });

  it('should set targetOffer', () => {
    expect(
      offersData.reducer(initialState, {
        type: fetchTargetOfferAction.fulfilled.type,
        payload: targetOfferPayload,
      })
    ).toEqual({
      ...initialState,
      targetOffer,
      reviewsIncoming,
      nearbyOffers,
      isError: false,
    });
  });

  it('should set isError to "true" on targetOffer rejected', () => {
    expect(
      offersData.reducer(initialState, {
        type: fetchTargetOfferAction.rejected.type,
      })
    ).toEqual({ ...initialState, isError: true });
  });

  it('should update reviewsIncoming', () => {
    expect(
      offersData.reducer(initialState, {
        type: sendReviewAction.fulfilled.type,
        payload: reviewsIncoming,
      })
    ).toEqual({ ...initialState, reviewsIncoming });
  });
});
