import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setCity } from '../../store/offers-process/offers-process';
import { getAuthorizationStatus } from '../../store/user-process/user-process-selectors';
import { loginAction } from '../../store/api-actions';
import { AuthData } from '../../types/auth-data';
import { redirectToRoute } from '../../store/actions';
import { AppRoute, AuthorizationStatus, Cities } from '../../const';
import LogoLink from '../../components/logo-link/logo-link';

const VALIDATION_REG_EXP = /^(?=.*?[A-Za-z])(?=.*?[0-9]).{2,}$/;

function LoginPage(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const loginRef = useRef<HTMLInputElement | null>(null);
  const [passwordPayload, setPasswordPayload] = useState('');
  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPasswordPayload(event.target.value);
  };

  const dispatch = useAppDispatch();

  const randomCity = Cities[Math.floor(Math.random() * Cities.length)];
  const onCityClick = () => {
    dispatch(setCity({ targetCity: randomCity }));
    dispatch(redirectToRoute(AppRoute.Main));
  };

  const isValid = () => VALIDATION_REG_EXP.test(passwordPayload);
  const onSubmit = (authData: AuthData) => {
    dispatch(loginAction(authData));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (loginRef.current !== null) {
      onSubmit({
        login: loginRef.current.value,
        password: passwordPayload,
      });
    }
  };

  if (authorizationStatus === AuthorizationStatus.Auth) {
    return <Navigate to={AppRoute.Main} />;
  }

  return (
    <section className="page page--gray page--login">
      <Helmet>
        <title>Six cities. Please authorize.</title>
      </Helmet>

      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <LogoLink />
            </div>
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form
              className="login__form form"
              action="#"
              method="post"
              autoComplete="off"
              onSubmit={handleSubmit}
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  ref={loginRef}
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handlePasswordChange}
                  required
                />
              </div>
              <button
                className="login__submit form__submit button"
                type="submit"
                disabled={!isValid()}
              >
                Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="/#" onClick={onCityClick}>
                <span>{randomCity}</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </section>
  );
}

export default LoginPage;
