import { HousingType } from '../const';
import { User } from './user';
import { City } from './city';
import { Location } from './location';

export type Offer = {
  id: number;
  previewImage: string;
  title: string;
  isPremium: boolean;
  price: number;
  rating: number;
  bedrooms: number;
  city: City;
  description: string;
  goods: string[];
  host: User;
  images: string[];
  location: Location;
  maxAdults: number;
  type: typeof HousingType[number];
};
