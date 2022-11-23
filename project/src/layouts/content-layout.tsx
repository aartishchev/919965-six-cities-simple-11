import { Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '../hooks';
import { AppRoute } from '../const';
import LogoLink from '../components/logo-link/logo-link';
import LoadingScreen from '../pages/loading-screen/loading-screen';

function ContentLayout() {
  const { pathname } = useLocation();
  const isMainPage = pathname === AppRoute.Main;
  const areOffersLoading = useAppSelector((state) => state.areOffersLoading);
  const offers = useAppSelector((state) => state.offers);

  if (areOffersLoading && !offers.length) {
    return <LoadingScreen />;
  }

  return (
    <>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <LogoLink isActive={isMainPage} />
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <div className="header__nav-profile">
                    <div className="header__avatar-wrapper user__avatar-wrapper" />
                    <span className="header__user-name user__name">
                      Oliver.conner@gmail.com
                    </span>
                  </div>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <Outlet />
    </>
  );
}

export default ContentLayout;
