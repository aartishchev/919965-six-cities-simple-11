import StartPage from '../../pages/start-page/start-page';

type StartPageProps = {
  placesFound: number;
}

function App({ placesFound }: StartPageProps ): JSX.Element {
  return (
    <StartPage placesFound={ placesFound } />
  );
}

export default App;
