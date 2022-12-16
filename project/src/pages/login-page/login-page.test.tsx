import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { AuthorizationStatus } from '../../const';
import { HelmetProvider } from 'react-helmet-async';
import { makeFakeUserData } from '../../utils/mocks';
import { UserProcess } from '../../types/state';
import LoginPage from './login-page';
import HistoryRouter from '../../components/history-router/history-router';
import userEvent from '@testing-library/user-event';

const mockStore = configureMockStore();

const history = createMemoryHistory();

const mockUserState: UserProcess = {
  authorizationStatus: AuthorizationStatus.Auth,
  userData: makeFakeUserData(),
};

const fakeStore = mockStore({
  USER: mockUserState,
});

describe('Component: LoginPage', () => {
  it('should update login inputs', async () => {
    render(
      <Provider store={fakeStore}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <LoginPage />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();

    await userEvent.type(screen.getByPlaceholderText(/email/i), 'test@test.ru');
    await userEvent.type(screen.getByPlaceholderText(/password/i), 'a123');

    expect(screen.getByDisplayValue('test@test.ru')).toBeInTheDocument();
    expect(screen.getByDisplayValue('a123')).toBeInTheDocument();
  });
});
