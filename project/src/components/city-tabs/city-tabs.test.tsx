import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-router/history-router';
import thunk from 'redux-thunk';
import CityTabs from './city-tabs';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const history = createMemoryHistory();

const fakeStore = mockStore({
  OFFER: {
    selectedCity: 'Brussels',
  },
});

describe('Component: AppHeader', () => {
  it('should render correctly', () => {
    render(
      <Provider store={fakeStore}>
        <HistoryRouter history={history}>
          <CityTabs />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('Paris')).toBeInTheDocument();
    expect(screen.getByText('Cologne')).toBeInTheDocument();
    expect(screen.getByText('Brussels')).toBeInTheDocument();
    expect(screen.getByText('Amsterdam')).toBeInTheDocument();
    expect(screen.getByText('Hamburg')).toBeInTheDocument();
    expect(screen.getByText('Dusseldorf')).toBeInTheDocument();
  });

  xit('selected city should contain active className', () => {
    render(
      <Provider store={fakeStore}>
        <HistoryRouter history={history}>
          <CityTabs />
        </HistoryRouter>
      </Provider>
    );

    // const element = container.querySelector('#sandbox > form > div:nth-child(2)');
    // const element = within(screen.getByText('Brussels'));
    //   console.log('element', element)
  //  element.contains('tabs__item--active');
  });

  xit('should change selected city on click', () => {
    render(
      <Provider store={fakeStore}>
        <HistoryRouter history={history}>
          <CityTabs />
        </HistoryRouter>
      </Provider>
    );

    // await userEvent.click(screen.getByRole('button'));

    // const actions = store.getActions();

    // expect(actions[0].type).toBe('data/fetchQuestions/pending');
  });
});


