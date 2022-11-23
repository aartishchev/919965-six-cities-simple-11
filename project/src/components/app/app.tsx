import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppRoute } from '../../const';
import LoginPage from '../../pages/login-page/login-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import PropertyPage from '../../pages/property-page/property-page';
import StartPage from '../../pages/start-page/start-page';
import ScrollToTop from '../scroll-to-top/scroll-to-top';
import ContentLayout from '../../layouts/content-layout';

function App(): JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path={AppRoute.Main} element={<ContentLayout />}>
            <Route index element={<StartPage />} />
            <Route
              path={AppRoute.Room}
              element={<PropertyPage />}
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
