import { ReviewIncoming } from '../types/review';

export const reviews: ReviewIncoming[] = [
  {
    id: 1,
    comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.',
    date: 'Thu Nov 10 2022 09:31:33 GMT+0300 (Москва, стандартное время)',
    rating: 4,
    user: {
      id: 1,
      avatarUrl: 'img/avatar-max.jpg',
      isPro: true,
      name: 'Max',
    },
  },
  {
    id: 2,
    comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.',
    date: 'Thu Nov 10 2022 09:31:33 GMT+0300 (Москва, стандартное время)',
    rating: 4,
    user: {
      id: 1,
      avatarUrl: 'img/avatar-max.jpg',
      isPro: true,
      name: 'Max',
    },
  }
];
