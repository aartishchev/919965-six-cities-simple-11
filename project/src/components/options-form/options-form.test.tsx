import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-router/history-router';
import OptionsForm from './options-form';

const mockStore = configureMockStore();
const history = createMemoryHistory();

const fakeStore = mockStore({
  OFFER: {
    selectedSorting: 'Top rated first',
  },
});

describe('Component: OptionsForm', () => {
  it('should render correctly', () => {
    render(
      <Provider store={fakeStore}>
        <HistoryRouter history={history}>
          <OptionsForm />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('Sort by')).toBeInTheDocument();
  });
});
