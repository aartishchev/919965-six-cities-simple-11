import { Cities } from '../const';
import { Location } from './location';

export type City = {
  location: Location;
  name: typeof Cities[number];
}
