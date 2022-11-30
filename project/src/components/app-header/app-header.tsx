import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getAuthorizationStatus, getUserData } from '../../store/user-process/user-process-selectors';
import { checkAuthAction, logoutAction } from '../../store/api-actions';
import { AppRoute, AuthorizationStatus } from '../../const';
import LogoLink from '../../components/logo-link/logo-link';

function AppHeader() {
  const { pathname } = useLocation();
  const isMainPage = pathname === AppRoute.Main;
  const currentUser = useAppSelector(getUserData);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Unknown) {
      dispatch(checkAuthAction());
    }
  }, [authorizationStatus, dispatch]);

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <LogoLink isActive={isMainPage} />
          </div>
          <nav className="header__nav">
            {authorizationStatus === AuthorizationStatus.Auth ? (
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <div className="header__nav-profile">
                    <div
                      className="header__avatar-wrapper user__avatar-wrapper"
                      style={{ backgroundImage: `url(${currentUser?.avatarUrl || '' })` }}
                    />
                    <span className="header__user-name user__name">{currentUser?.email}</span>
                  </div>
                </li>
                <li className="header__nav-item">
                  <a
                    className="header__nav-link"
                    href="/#"
                    onClick={(event) => {
                      event.preventDefault();
                      dispatch(logoutAction());
                    }}
                  >
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            ) : (
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a
                    className="header__nav-link header__nav-link--profile"
                    href="/#"
                    onClick={(event) => {
                      event.preventDefault();
                      navigate(AppRoute.Login);
                    }}
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper" />
                    <span className="header__login">Sign in</span>
                  </a>
                </li>
              </ul>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}

export default AppHeader;
