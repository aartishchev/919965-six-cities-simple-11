import { Helmet } from 'react-helmet-async';

function NotFoundPage(): JSX.Element {
  return (
    <>
      <Helmet>
        <title>Six cities. Page not found.</title>
      </Helmet>

      <main className="page__main page__main--index page__main--index-empty">
        <h1 className="visually-hidden">Not found page</h1>
        <div className="cities">
          <div className="cities__places-container cities__places-container--empty container">
            <section className="cities__no-places">
              <div className="cities__status-wrapper tabs__content">
                <b className="cities__status">404 Not Found</b>
                <p className="cities__status-description">
                  We could not find page with the target url address <br />
                  Please click on the logo to enter the main page
                </p>
              </div>
            </section>
            <div className="cities__right-section"></div>
          </div>
        </div>
      </main>
    </>
  );
}

export default NotFoundPage;
