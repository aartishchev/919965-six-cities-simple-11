import { Link } from 'react-router-dom';

function LogoLink(): JSX.Element {
  return (
    <Link className="header__logo-link" to="/">
      <span className="visually-hidden">Go to the main page</span>
      <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
    </Link>
  );
}

export default LogoLink;
