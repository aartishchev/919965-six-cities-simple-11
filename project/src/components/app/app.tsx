import { Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppRoute } from '../../const';
import LoginPage from '../../pages/login-page/login-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import PropertyPage from '../../pages/property-page/property-page';
import StartPage from '../../pages/start-page/start-page';
import ScrollToTop from '../scroll-to-top/scroll-to-top';
import ContentLayout from '../../layouts/content-layout';
import HistoryRouter from '../history-router/history-router';
import browserHistory from '../../browser-history';

function App(): JSX.Element {
  return (
    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
        <ScrollToTop />
        <Routes>
          <Route path={AppRoute.Login} element={<LoginPage />} />
          <Route path={AppRoute.Main} element={<ContentLayout />}>
            <Route index element={<StartPage />} />
            <Route path={AppRoute.Room} element={<PropertyPage />} />
            <Route path={AppRoute.Fallback} element={<NotFoundPage />} />
          </Route>
        </Routes>
      </HistoryRouter>
    </HelmetProvider>
  );
}

export default App;
