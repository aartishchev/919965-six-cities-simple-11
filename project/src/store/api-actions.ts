import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state.js';
import { saveToken, dropToken } from '../services/token';
import { APIRoute, AppRoute, AuthorizationStatus } from '../const';
import { Offer } from '../types/offer';
import { ReviewIncoming, ReviewOutgoing } from '../types/review.js';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import {
  setOffers,
  setAuthorizationStatus,
  setDataLoadingStatus,
  redirectToRoute,
  setUserData,
  setNearbyOffers,
  setTargetOffer,
  setReviewsIncoming,
} from './actions';

export const fetchOffersAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchOffers', async (_arg, { dispatch, extra: api }) => {
  dispatch(setDataLoadingStatus(true));
  const { data } = await api.get<Offer[]>(APIRoute.Offers);
  dispatch(setOffers(data));
  dispatch(setDataLoadingStatus(false));
});

export const fetchTargetOfferAction = createAsyncThunk<
  void,
  Offer['id'],
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchTargetOffer', async (hotelId, { dispatch, extra: api }) => {
  dispatch(setDataLoadingStatus(true));
  const [offer, nearby, comments] = await Promise.all([
    api.get<Offer>(`${APIRoute.Offers}/${hotelId}`),
    api.get<Offer[]>(`${APIRoute.Offers}/${hotelId}/nearby`),
    api.get<ReviewIncoming[]>(`${APIRoute.Comments}/${hotelId}`),
  ]);
  dispatch(setTargetOffer(offer.data));
  dispatch(setNearbyOffers(nearby.data));
  dispatch(setReviewsIncoming(comments.data));
  dispatch(setDataLoadingStatus(false));
});

export const checkAuthAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/checkAuth', async (_arg, { dispatch, extra: api }) => {
  try {
    const { data } = await api.get<UserData>(APIRoute.Login);
    dispatch(setUserData(data));
    dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
  } catch {
    dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
  }
});

export const loginAction = createAsyncThunk<
  void,
  AuthData,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'user/login',
  async ({ login: email, password }, { dispatch, extra: api }) => {
    const { data } = await api.post<UserData>(APIRoute.Login, { email, password });
    saveToken(data.token);
    dispatch(setUserData(data));
    dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
    dispatch(redirectToRoute(AppRoute.Main));
  }
);

export const logoutAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/logout', async (_arg, { dispatch, extra: api }) => {
  await api.delete(APIRoute.Logout);
  dropToken();
  dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
});

export const sendReviewAction = createAsyncThunk<
  void,
  {
    targetId: Offer['id'];
    review: ReviewOutgoing['review'];
    rating: ReviewOutgoing['rating'];
  },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'data/sendReview',
  async (
    { review: comment, rating, targetId: hotelId },
    { dispatch, extra: api }
  ) => {
    const { data } = await api.post<ReviewIncoming[]>(
      `${APIRoute.Comments}/${hotelId}`,
      { comment, rating }
    );
    dispatch(setReviewsIncoming(data));
  }
);
