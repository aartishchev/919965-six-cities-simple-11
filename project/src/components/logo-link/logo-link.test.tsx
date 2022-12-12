import { render, screen } from '@testing-library/react';
import { Routes, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-router/history-router';
import userEvent from '@testing-library/user-event';
import LogoLink from './logo-link';

const history = createMemoryHistory();

describe('Component: LogoLink', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <LogoLink />
      </HistoryRouter>
    );

    expect(screen.getByText(/Go to the main page/i)).toBeInTheDocument();
    expect(screen.getByAltText(/6 cities logo/i)).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('should redirect to root url when user clicked to link', async () => {
    history.push('/fake');

    render(
      <HistoryRouter history={history}>
        <Routes>
          <Route path="*" element={<LogoLink />} />
          <Route path="/" element={<h1>This is start page</h1>} />
        </Routes>
      </HistoryRouter>
    );

    expect(screen.queryByText(/This is start page/i)).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole('link'));
    expect(screen.getByText(/This is start page/i)).toBeInTheDocument();
  });
});
