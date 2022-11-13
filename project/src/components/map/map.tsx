import { useEffect, useRef } from 'react';
import { Icon, Marker } from 'leaflet';
import { PinIcon } from '../../const';
import { City } from '../../types/city';
import { Offer } from '../../types/offer';
import useMap from '../../hooks/use-map';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  city: City;
  offers: Offer[];
  selectedOffer: Offer | null;
};

const defaultCustomIcon = new Icon({
  iconUrl: PinIcon.Default,
  iconSize: [30, 40],
  iconAnchor: [15, 40],
});

const currentCustomIcon = new Icon({
  iconUrl: PinIcon.Active,
  iconSize: [30, 40],
  iconAnchor: [15, 40],
});

function Map(props: MapProps): JSX.Element {
  const { city, offers, selectedOffer } = props;
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude,
        });

        marker
          .setIcon(offer.id === selectedOffer?.id ? currentCustomIcon : defaultCustomIcon)
          .addTo(map);
      });
    }
  }, [map, offers, selectedOffer]);

  return <section className="cities__map map" ref={mapRef} />;
}

export default Map;
