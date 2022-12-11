import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setCity } from '../../store/offers-process/offers-process';
import { getAuthorizationStatus } from '../../store/user-process/user-process-selectors';
import { checkAuthAction, loginAction } from '../../store/api-actions';
import { AuthData } from '../../types/auth-data';
import { redirectToRoute } from '../../store/actions';
import { AppRoute, AuthorizationStatus, Cities } from '../../const';
import LogoLink from '../../components/logo-link/logo-link';

const EMAIL_VALIDATION_REG_EX = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
const PASSWORD_VALIDATION_REG_EX = /^(?=.*?[A-Za-z])(?=.*?[0-9]).{2,}$/;

function LoginPage(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  const [authPayload, setAuthPayload] = useState<AuthData>({
    email: '',
    password: '',
  });

  const handleAuthDataChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setAuthPayload({ ...authPayload, [name]: value });
  };

  const dispatch = useAppDispatch();

  const isValid = () => {
    const isEmailValid = EMAIL_VALIDATION_REG_EX.test(authPayload.email);
    const isPasswordValid = PASSWORD_VALIDATION_REG_EX.test(authPayload.password);

    return isEmailValid && isPasswordValid;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(loginAction(authPayload));
  };

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Unknown) {
      dispatch(checkAuthAction());
    }

    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(redirectToRoute(AppRoute.Main));
    }
  }, [authorizationStatus, dispatch]);

  const randomCity = useMemo(() => Cities[Math.floor(Math.random() * Cities.length)], []);
  const onCityClick = () => {
    dispatch(setCity({ targetCity: randomCity }));
    dispatch(redirectToRoute(AppRoute.Main));
  };

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
              onSubmit={handleSubmit}
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={handleAuthDataChange}
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
                  onChange={handleAuthDataChange}
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
