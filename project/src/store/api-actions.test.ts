import thunk, { ThunkDispatch } from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { Action } from 'redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../services/api';
import { datatype } from 'faker';
import { redirectToRoute } from './actions';
import { APIRoute, AUTH_TOKEN_KEY_NAME } from '../const';
import { State } from '../types/state';
import { AuthData } from '../types/auth-data';
import {
  checkAuthAction,
  fetchOffersAction,
  fetchTargetOfferAction,
  loginAction,
  logoutAction,
  sendReviewAction,
} from './api-actions';
import {
  makeFakeOffer,
  makeFakeOffers,
  makeFakeReviewOutgoing,
  makeFakeReviewsIncoming,
  makeFakeUserData,
} from '../utils/mocks';

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];
  const mockStore = configureMockStore<
    State,
    Action<string>,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

  it('should fetchOffersAction when server returns 200', async () => {
    const offers = makeFakeOffers();

    const store = mockStore();
    mockAPI.onGet(APIRoute.Offers).reply(200, offers);
    expect(store.getActions()).toEqual([]);
    await store.dispatch(fetchOffersAction());
    const actions = store.getActions().map(({ type }) => type);
    expect(actions).toEqual([
      fetchOffersAction.pending.type,
      fetchOffersAction.fulfilled.type,
    ]);
  });

  it('should fetchTargetOfferAction when server returns 200', async () => {
    const hotelId = datatype.number(100);
    const targetOffer = makeFakeOffer();
    const reviewsIncoming = makeFakeReviewsIncoming();
    const nearbyOffers = makeFakeOffers();

    const store = mockStore();
    mockAPI.onGet(`${APIRoute.Offers}/${hotelId}`).reply(200, targetOffer);
    mockAPI
      .onGet(`${APIRoute.Offers}/${hotelId}/nearby`)
      .reply(200, nearbyOffers);
    mockAPI
      .onGet(`${APIRoute.Comments}/${hotelId}`)
      .reply(200, reviewsIncoming);

    expect(store.getActions()).toEqual([]);
    await store.dispatch(fetchTargetOfferAction(hotelId));
    const actions = store.getActions().map(({ type }) => type);
    expect(actions).toEqual([
      fetchTargetOfferAction.pending.type,
      fetchTargetOfferAction.fulfilled.type,
    ]);
  });

  it('should dispatch sendReviewAction when server returns 200', async () => {
    const targetId = datatype.number(100);
    const reviewOutgoing = makeFakeReviewOutgoing();
    const reviewsIncoming = makeFakeReviewsIncoming();

    const store = mockStore();
    mockAPI
      .onPost(`${APIRoute.Comments}/${targetId}`)
      .reply(200, reviewsIncoming);

    expect(store.getActions()).toEqual([]);
    await store.dispatch(sendReviewAction({ targetId, ...reviewOutgoing }));
    const actions = store.getActions().map(({ type }) => type);
    expect(actions).toEqual([
      sendReviewAction.pending.type,
      sendReviewAction.fulfilled.type,
    ]);
  });

  it('should dispatch checkUserAction when server returns 200', async () => {
    const user = makeFakeUserData();

    const store = mockStore();
    mockAPI.onGet(APIRoute.Login).reply(200, user);
    expect(store.getActions()).toEqual([]);
    await store.dispatch(checkAuthAction());
    const actions = store.getActions().map(({ type }) => type);
    expect(actions).toEqual([
      checkAuthAction.pending.type,
      checkAuthAction.fulfilled.type,
    ]);
  });

  it('should dispatch loginAction and redirectToRoute when POST /login', async () => {
    const fakeUser: AuthData = { email: 'test@test.ru', password: 'A123456' };

    mockAPI.onPost(APIRoute.Login).reply(200, { token: 'secret' });

    const store = mockStore();
    Storage.prototype.setItem = jest.fn();

    await store.dispatch(loginAction(fakeUser));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      loginAction.pending.type,
      redirectToRoute.type,
      loginAction.fulfilled.type,
    ]);

    expect(Storage.prototype.setItem).toBeCalledTimes(1);
    expect(Storage.prototype.setItem).toBeCalledWith(
      AUTH_TOKEN_KEY_NAME,
      'secret'
    );
  });

  it('should dispatch Logout when Delete /logout', async () => {
    mockAPI.onDelete(APIRoute.Logout).reply(204);

    const store = mockStore();
    Storage.prototype.removeItem = jest.fn();

    await store.dispatch(logoutAction());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      logoutAction.pending.type,
      logoutAction.fulfilled.type,
    ]);

    expect(Storage.prototype.removeItem).toBeCalledTimes(1);
    expect(Storage.prototype.removeItem).toBeCalledWith(AUTH_TOKEN_KEY_NAME);
  });
});
