import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import NotFoundPage from './not-found-page';

describe('Component: NotFoundPage', () => {
  it('should render correctly', () => {
    render(
      <HelmetProvider>
        <NotFoundPage />
      </HelmetProvider>
    );

    expect(screen.getByText('404 Not Found')).toBeInTheDocument();
    expect(
      screen.getByText(
        'We could not find page with the target url address Please click on the logo to enter the main page'
      )
    ).toBeInTheDocument();
  });
});
