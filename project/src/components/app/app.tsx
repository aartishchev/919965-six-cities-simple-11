import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppRoute } from '../../const';
import { Offer } from '../../types/offer';
import { ReviewIncoming } from '../../types/review';
import LoginPage from '../../pages/login-page/login-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import PropertyPage from '../../pages/property-page/property-page';
import StartPage from '../../pages/start-page/start-page';
import ScrollToTop from '../scroll-to-top/scroll-to-top';
import ContentLayout from '../../layouts/content-layout';

type StartPageProps = {
  offers: Offer[];
  reviews: ReviewIncoming[];
};

function App({ offers, reviews }: StartPageProps): JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path={AppRoute.Main} element={<ContentLayout />}>
            <Route index element={<StartPage offers={offers} />} />
            <Route
              path={AppRoute.Room}
              element={<PropertyPage reviews={reviews} offers={offers} />}
            />
            <Route path={AppRoute.Login} element={<LoginPage />} />
            <Route path={AppRoute.Fallback} element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
