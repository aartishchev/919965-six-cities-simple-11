import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import cn from 'classnames';

type LogoLinkProps = {
  isActive: boolean;
}

function LogoLink({ isActive }: LogoLinkProps): JSX.Element {
  return (
    <Link
      className={ cn('header__logo-link', { 'header__logo-link--active': isActive })}
      to={ AppRoute.Main }
    >
      <span className="visually-hidden">Go to the main page</span>
      <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
    </Link>
  );
}

export default LogoLink;
