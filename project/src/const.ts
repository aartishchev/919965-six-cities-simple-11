export const AppRoute = {
  Main: '/',
  Login: '/login',
  Room: '/offer/:id',
  Fallback: '*',
} as const;

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const Cities = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf',
] as const;

export const DEFAULT_CITY: typeof Cities[number] = 'Paris';

export const SortingOptions = [
  'Popular',
  'Price: low to high',
  'Price: high to low',
  'Top rated first',
] as const;

export const DEFAULT_SORTING: typeof SortingOptions[number] = 'Popular';

export const HousingType = ['apartment', 'room', 'house', 'hotel'] as const;

export const RatingScores = [
  {
    value: 1,
    title: 'terribly',
  },
  {
    value: 2,
    title: 'badly',
  },
  {
    value: 3,
    title: 'not bad',
  },
  {
    value: 4,
    title: 'good',
  },
  {
    value: 5,
    title: 'perfect',
  },
] as const;

export const ExtremeRatingValue = {
  DefaultRating: 0,
  MaxRating: 5,
} as const;

export const FormInputLength = {
  MinLength: 50,
  MaxLength: 300,
} as const;

export const PinIcon = {
  Default: '/img/pin.svg',
  Active: '/img/pin-active.svg',
} as const;

export const IconSize = {
  Width: 30,
  Height: 40,
} as const;

export const BACKEND_URL = 'https://11.react.pages.academy/six-cities-simple';
export const REQUEST_TIMEOUT = 5000;
export const AUTH_TOKEN_KEY_NAME = 'six-cities-token';

export enum APIRoute {
  Offers = '/hotels',
  Login = '/login',
  Logout = '/logout',
}
