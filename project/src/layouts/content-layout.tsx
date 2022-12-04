import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useAppDispatch } from '../hooks';
import { fetchOffersAction } from '../store/api-actions';
import AppHeader from '../components/app-header/app-header';

function ContentLayout() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchOffersAction());
  }, [dispatch]);

  return (
    <section className="page page--gray page--main">
      <AppHeader />
      <Outlet />
    </section>
  );
}

export default ContentLayout;
