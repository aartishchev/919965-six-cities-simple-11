import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-router/history-router';
import { AppRoute, AuthorizationStatus } from '../../const';
import AppHeader from './app-header';
import { internet } from 'faker';
import { Route, Routes } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const history = createMemoryHistory();

describe('Component: AppHeader', () => {
  it('should render "Sign in" link when user is not authorized', () => {
    const fakeStore = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        userData: null,
      },
    });

    render(
      <Provider store={fakeStore}>
        <HistoryRouter history={history}>
          <AppHeader />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('Sign in')).toBeInTheDocument();
  });

  it('should render "Sign out" link and login email when user is authorized', () => {
    const fakeEmail = internet.email();
    const fakeStore = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.Auth,
        userData: {
          email: fakeEmail,
        },
      },
    });

    render(
      <Provider store={fakeStore}>
        <HistoryRouter history={history}>
          <AppHeader />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('Sign out')).toBeInTheDocument();
    expect(screen.getByText(fakeEmail)).toBeInTheDocument();
  });

  it('should redirect to LoginPage when "Sign in" clicked', async () => {
    const fakeStore = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        userData: null,
      },
    });

    render(
      <Provider store={fakeStore}>
        <HistoryRouter history={history}>
          <Routes>
            <Route path={AppRoute.Main} element={<AppHeader />} />
            <Route path={AppRoute.Login} element={<h1>Mock login page</h1>} />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    await userEvent.click(screen.getByText('Sign in'));
    expect(screen.getByText('Mock login page')).toBeInTheDocument();
  });
});
