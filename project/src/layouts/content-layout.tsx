import { Outlet } from 'react-router-dom';
import { useAppSelector } from '../hooks';
import LoadingScreen from '../pages/loading-screen/loading-screen';
import AppHeader from '../components/app-header/app-header';

function ContentLayout() {
  const areOffersLoading = useAppSelector((state) => state.areOffersLoading);
  const offers = useAppSelector((state) => state.offers);

  if (areOffersLoading && !offers.length) {
    return <LoadingScreen />;
  }

  return (
    <>
      <AppHeader />
      <Outlet />
    </>
  );
}

export default ContentLayout;
