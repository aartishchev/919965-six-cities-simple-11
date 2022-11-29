import { Outlet } from 'react-router-dom';
import { useAppSelector } from '../hooks';
import LoadingScreen from '../pages/loading-screen/loading-screen';
import AppHeader from '../components/app-header/app-header';

function ContentLayout() {
  const isDataLoading = useAppSelector((state) => state.isDataLoading);
  const offers = useAppSelector((state) => state.offers);

  if (isDataLoading && !offers.length) {
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
