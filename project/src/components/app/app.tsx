import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppRoute } from '../../const';
import { Offer } from '../../types/offer';
import { ReviewIncoming } from '../../types/review';
import LoginPage from '../../pages/login-page/login-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import PropertyPage from '../../pages/property-page/property-page';
import StartPage from '../../pages/start-page/start-page';

type StartPageProps = {
  placesFound: number;
  offers: Offer[];
  reviews: ReviewIncoming[];
};

function App({ placesFound, offers, reviews }: StartPageProps): JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.Main}
            element={<StartPage placesFound={placesFound} offers={offers} />}
          />
          <Route path={AppRoute.Room} element={<PropertyPage />} />
          <Route path={AppRoute.Login} element={<LoginPage />} />
          <Route path={AppRoute.Fallback} element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
