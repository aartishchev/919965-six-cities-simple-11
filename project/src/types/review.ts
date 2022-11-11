import { User } from './user';
import { RatingScores } from '../const';

export type ReviewIncoming = {
  comment: string;
  date: string;
  id: number;
  rating: number;
  user: User;
};

export type ReviewOutgoing = {
  review: string;
  rating: typeof RatingScores[number]['value'] | 0;
};
