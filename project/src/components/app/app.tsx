import { HelmetProvider } from 'react-helmet-async';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import LoginPage from '../../pages/login-page/login-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import PropertyPage from '../../pages/property-page/property-page';
import StartPage from '../../pages/start-page/start-page';

type StartPageProps = {
  placesFound: number;
}

function App({ placesFound }: StartPageProps ): JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={ AppRoute.Main }
            element={ <StartPage placesFound={ placesFound } />}
          >
          </Route>
          <Route
            path={ AppRoute.Room }
            element={ <PropertyPage />}
          >
          </Route>
          <Route
            path={ AppRoute.Login }
            element={ <LoginPage />}
          >
          </Route>
          <Route
            path="*"
            element={ <NotFoundPage />}
          >
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
