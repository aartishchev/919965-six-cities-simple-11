import { Middleware } from 'redux';
import { PayloadAction } from '@reduxjs/toolkit';
import {rootReducer} from '../root-reducer';
import browserHistory from '../../browser-history';

type Reducer = ReturnType<typeof rootReducer>;

export const redirect: Middleware<unknown, Reducer> =
  (_store) => (next) => (action: PayloadAction<string>) => {
    if (action.type === 'offer/redirectToRoute') {
      browserHistory.push(action.payload);
    }

    return next(action);
  };
