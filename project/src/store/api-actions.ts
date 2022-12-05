import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch } from '../types/state.js';
import { saveToken, dropToken } from '../services/token';
import { APIRoute, AppRoute } from '../const';
import { Offer } from '../types/offer';
import { ReviewIncoming, ReviewOutgoing } from '../types/review.js';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { redirectToRoute } from './actions';

export const fetchOffersAction = createAsyncThunk<
  Offer[],
  undefined,
  { extra: AxiosInstance }
>('data/fetchOffers', async (_arg, { extra: api }) => {
  const { data } = await api.get<Offer[]>(APIRoute.Offers);

  return data;
});

export const fetchTargetOfferAction = createAsyncThunk<
  [Offer, Offer[], ReviewIncoming[]],
  Offer['id'],
  { extra: AxiosInstance }
>('data/fetchTargetOffer', async (hotelId, { extra: api }) => {
  const [offer, nearbyOffers, comments] = await Promise.all([
    api.get<Offer>(`${APIRoute.Offers}/${hotelId}`),
    api.get<Offer[]>(`${APIRoute.Offers}/${hotelId}/nearby`),
    api.get<ReviewIncoming[]>(`${APIRoute.Comments}/${hotelId}`),
  ]);

  return [offer.data, nearbyOffers.data, comments.data];
});

export const sendReviewAction = createAsyncThunk<
  ReviewIncoming[],
  {
    targetId: Offer['id'];
    review: ReviewOutgoing['review'];
    rating: ReviewOutgoing['rating'];
  },
  { extra: AxiosInstance }
>(
  'data/sendReview',
  async ({ review: comment, rating, targetId: hotelId }, { extra: api }) => {
    const { data } = await api.post<ReviewIncoming[]>(
      `${APIRoute.Comments}/${hotelId}`,
      { comment, rating }
    );

    return data;
  }
);

export const checkAuthAction = createAsyncThunk<
  UserData,
  undefined,
  { extra: AxiosInstance }
>('user/checkAuth', async (_arg, { extra: api }) => {
  const { data } = await api.get<UserData>(APIRoute.Login);

  return data;
});

export const loginAction = createAsyncThunk<
  UserData,
  AuthData,
  {
    dispatch: AppDispatch;
    extra: AxiosInstance;
  }
>(
  'user/login',
  async ({ email, password }, { dispatch, extra: api }) => {
    const { data } = await api.post<UserData>(APIRoute.Login, {
      email,
      password,
    });
    saveToken(data.token);
    dispatch(redirectToRoute(AppRoute.Main));

    return data;
  }
);

export const logoutAction = createAsyncThunk<
  void,
  undefined,
  { extra: AxiosInstance }
>('user/logout', async (_arg, { extra: api }) => {
  await api.delete(APIRoute.Logout);
  dropToken();
});
