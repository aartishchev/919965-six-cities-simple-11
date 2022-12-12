import { datatype, image, internet, name } from 'faker';
import { Cities, HousingType } from '../const';
import { City } from '../types/city';
import { Offer } from '../types/offer';
import { ReviewIncoming, ReviewOutgoing } from '../types/review';
import { UserData } from '../types/user-data';

export const makeFakeUserData = (): UserData => ({
  avatarUrl: image.avatar(),
  email: internet.email(),
  id: datatype.number(100),
  isPro: datatype.boolean(),
  name: name.firstName(),
  token: datatype.string(),
});

export const makeFakeOffer = (): Offer => ({
  id: datatype.number(100),
  previewImage: image.abstract(),
  title: datatype.string(),
  isPremium: datatype.boolean(),
  price: datatype.number(100),
  rating: datatype.number(100),
  bedrooms: datatype.number(100),
  city: {
    location: {
      latitude: datatype.float(0.01),
      longitude: datatype.float(0.01),
      zoom: datatype.number(10),
    },
    name: Cities[Math.floor(Math.random() * Cities.length)],
  },
  description: datatype.string(),
  goods: Array.from({ length: datatype.number(10) }, () => datatype.string()),
  host: {
    id: datatype.number(100),
    avatarUrl: image.avatar(),
    isPro: datatype.boolean(),
    name: name.firstName(),
  },
  images: Array.from({ length: datatype.number(10) }, () => image.abstract()),
  location: {
    latitude: datatype.float(0.01),
    longitude: datatype.float(0.01),
    zoom: datatype.number(10),
  },
  maxAdults: datatype.number(100),
  type: HousingType[Math.floor(Math.random() * Cities.length)],
});

export const makeFakeOffers = (offersLength = 10) =>
  Array.from({ length: datatype.number(offersLength) }, (element, index) => ({
    ...makeFakeOffer(),
    id: index,
  }));

export const makeFakeReviewIncoming = (): ReviewIncoming => ({
  comment: datatype.string(),
  date: datatype.string(),
  id: datatype.number(100),
  rating: datatype.number(5),
  user: makeFakeUserData(),
});

export const makeFakeReviewsIncoming = (): ReviewIncoming[] =>
  Array.from({ length: datatype.number(10) }, (element, index) => ({ ...makeFakeReviewIncoming(), id: index }));


export const makeFakeReviewOutgoing = (): ReviewOutgoing => ({
  review: datatype.string(),
  rating: 5,
});

export const makeFakeCity = (): City => ({
  location: {
    latitude: datatype.float(0.01),
    longitude: datatype.float(0.01),
    zoom: datatype.number(10),
  },
  name: Cities[Math.floor(Math.random() * Cities.length)],
});
