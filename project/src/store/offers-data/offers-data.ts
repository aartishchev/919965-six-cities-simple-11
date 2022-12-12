import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { OffersData } from '../../types/state';
import {
  fetchOffersAction,
  fetchTargetOfferAction,
  sendReviewAction,
} from '../api-actions';

const initialState: OffersData = {
  offers: [],
  isDataLoading: false,
  targetOffer: null,
  nearbyOffers: [],
  reviewsIncoming: [],
  isError: true,
};

export const offersData = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.isDataLoading = false;
        state.offers = action.payload;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.isDataLoading = false;
      })
      .addCase(fetchTargetOfferAction.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(fetchTargetOfferAction.fulfilled, (state, action) => {
        const [targetOffer, nearbyOffers, comments] = action.payload;
        state.targetOffer = targetOffer;
        state.nearbyOffers = nearbyOffers;
        state.reviewsIncoming = comments;
        state.isError = false;
        state.isDataLoading = false;
      })
      .addCase(fetchTargetOfferAction.rejected, (state) => {
        state.isError = true;
        state.isDataLoading = false;
      })
      .addCase(sendReviewAction.fulfilled, (state, action) => {
        state.reviewsIncoming = action.payload;
      });
  },
});
