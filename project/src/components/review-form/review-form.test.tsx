import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import HistoryRouter from '../history-router/history-router';
import ReviewForm from './review-form';
import userEvent from '@testing-library/user-event';
import { datatype } from 'faker';

const history = createMemoryHistory();
const mockStore = configureMockStore();

describe('Component: ReviewForm', () => {
  it('should render correctly & update user review', async () => {
    render(
      <Provider store={mockStore({})}>
        <HistoryRouter history={history}>
          <ReviewForm targetId={datatype.number(100)} />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('Submit')).toBeInTheDocument();
    await userEvent.type(screen.getByRole('textbox'), 'test message');
    expect(screen.getByDisplayValue(/test message/i)).toBeInTheDocument();
  });
});
