import { Cities, HousingType } from '../const';
import { User } from './user';

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
}

type City = {
  location: Location;
  name: typeof Cities[number];
}

type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
}
