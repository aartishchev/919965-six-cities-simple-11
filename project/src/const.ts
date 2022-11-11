export enum AppRoute {
  Main = '/',
  Login = '/login',
  Room = '/offer/:id',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum PageNotFoundMessage {
  title = '404 Not Found',
  description ='We could not find page with the target url address. Please click on the logo to enter the main page'
}

export enum FailedSearchMessage {
  title = 'No places to stay available',
  description = 'We could not find any property available at the moment'
}

export const Cities = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf',
] as const;

export const HousingType = ['apartment', 'room', 'house', 'hotel'] as const;

export const RatingScores = [
  {
    value: 1,
    title: 'terribly'
  },
  {
    value: 2,
    title: 'badly'
  },
  {
    value: 3,
    title: 'not bad'
  },
  {
    value: 4,
    title: 'good'
  },
  {
    value: 5,
    title: 'perfect'
  }
];

export const Setting = {
  PlacesFound: 312,
} as const;

export const MAX_RATING = 5;

export enum FormInputLength {
  MinLength = 50,
  MaxLength = 300
}
