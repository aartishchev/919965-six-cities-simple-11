import { NameSpace } from '../../const';
import { OffersData, State } from '../../types/state';

export const getOffers = (state: State): OffersData['offers'] =>
  state[NameSpace.Data].offers;
export const getTargetOffer = (state: State): OffersData['targetOffer'] =>
  state[NameSpace.Data].targetOffer;
export const getNearbyOffers = (state: State): OffersData['nearbyOffers'] =>
  state[NameSpace.Data].nearbyOffers;
export const getReviewsIncoming = (state: State): OffersData['reviewsIncoming'] =>
  state[NameSpace.Data].reviewsIncoming;
export const getDataLoadingStatus = (state: State): OffersData['isDataLoading'] =>
  state[NameSpace.Data].isDataLoading;
export const getErrorStatus = (state: State): OffersData['isError'] =>
  state[NameSpace.Data].isError;
